import { Injectable } from '@nestjs/common';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { CreatedTaskResponse } from './payload/created-task-response.payload';
import { UserEntity } from '../user/entities/user.entity';
import { CommandResponse } from '../../libs/response/command.response';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { CloudinaryService } from '../../libs/cloudinary/cloudinary.service';
import { AttachmentEntity } from './entities/attachment.entity';
import { TaskSubmissionEntity } from './entities/task-submission.entity';
import { PaginationRequest } from '../../libs/request/pagination.request';
import { RoleEnum } from '../user/enum/role.enum';
import { EvaluateSubmissionPayload } from './payload/evaluate-submission.payload';

// Import Swagger decorators
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Injectable()
@ApiTags('Tasks') // Add a tag to group related endpoints in Swagger
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(AttachmentEntity)
    private readonly attachmentRepository: Repository<AttachmentEntity>,
    @InjectRepository(TaskSubmissionEntity)
    private readonly taskSubmissionRepository: Repository<TaskSubmissionEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({
    type: CreateTaskPayload,
    description: 'The payload for creating a new task',
  })
  @ApiResponse({
    status: 201,
    type: CreatedTaskResponse,
    description: 'The created task',
  })
  async create(
    createTaskPayload: CreateTaskPayload,
    user: UserEntity,
  ): Promise<CommandResponse> {
    const task = new TaskEntity();
    task.course = createTaskPayload.courseId;
    task.title = createTaskPayload.title;
    task.description = createTaskPayload.description;
    task.dueDate = createTaskPayload.dueDate;
    task.createdBy = user;

    const uploadAttachments = createTaskPayload.attachments.map((a) =>
      this.cloudinaryService.uploadDocument(a),
    );
    const attachments = await Promise.all(uploadAttachments);

    task.attachments = await Promise.all(
      attachments.map((a) => {
        const attachment = new AttachmentEntity();
        attachment.url = a.url;
        attachment.fileName = a.fileName;
        return this.attachmentRepository.save(attachment);
      }),
    );

    await this.taskRepository.save(task);
    return {
      id: task.id,
    };
  }
  @ApiOperation({ summary: 'Submit a solution for a task' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to submit a solution for',
  })
  @ApiResponse({ status: 200, description: 'The solution has been submitted' })
  async submitTaskSolution(
    taskId: string,
    attachments: Express.Multer.File[],
    user: UserEntity,
  ) {
    const task = await this.taskRepository.findOneOrFail({
      where: { id: taskId },
    });
    const submission = new TaskSubmissionEntity();
    submission.submittedBy = user;
    submission.task = task;

    const uploadAttachments = attachments.map((a) =>
      this.cloudinaryService.uploadDocument(a),
    );
    const uploadedAttachments = await Promise.all(uploadAttachments);

    submission.attachments = await Promise.all(
      uploadedAttachments.map((a) => {
        const attachment = new AttachmentEntity();
        attachment.url = a.url;
        attachment.fileName = a.fileName;
        return this.attachmentRepository.save(attachment);
      }),
    );

    await this.taskSubmissionRepository.save(submission);
    return {
      id: submission.id,
    };
  }
  
  @ApiOperation({ summary: 'Get a list of tasks' })
  @ApiResponse({
    status: 200,
    type: [TaskEntity],
    description: 'A list of tasks',
  })
  async find(
    user: UserEntity,
    { filter, orderBy, page, limit }: PaginationRequest<TaskEntity>,
  ) {
    const offset = (page - 1) * limit;
    const tasks = await this.taskRepository.find({
      where: {
        course: {
          members: {
            user: user.id,
          },
        },
        ...filter,
      },
      order: {
        ...orderBy,
        submissions: {
          submitted_at: 'DESC',
        },
      },
      skip: offset,
      take: limit,
      relations: {
        createdBy: true,
        course: true,
        submissions: {
          attachments: true,
          submittedBy: true,
        },
        attachments: true,
      },
    });
    return tasks.map((t) => {
      const submissions = t.submissions.filter((s) => {
        // @ts-ignore
        const submittedBy = filter?.course?.members?.user ?? user.id;
        return s.submittedBy.id === submittedBy;
      });
      return {
        ...t,
        submissions: submissions.slice(0, 1),
      };
    });
  }
  
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to find' })
  @ApiResponse({ status: 200, type: TaskEntity, description: 'The found task' })
  async findOne(id: string, user: UserEntity) {
    return this.taskRepository.findOne({
      where: {
        id,
        submissions: {
          submittedBy: {
            id: user.role === RoleEnum.Student ? user.id : undefined,
          },
        },
      },
      order: {
        submissions: {
          submitted_at: 'DESC',
        },
      },
      relations: {
        createdBy: true,
        course: true,
        submissions: true,
      },
    });
  }
  @ApiOperation({ summary: 'Evaluate a task submission' })
  async evaluateTask(
    submissionId: string,
    payload: EvaluateSubmissionPayload,
  ): Promise<CommandResponse> {
    const submission = await this.taskSubmissionRepository.findOneOrFail({
      where: {
        id: submissionId,
      },
    });
    submission.grade = payload.grade;
    await this.taskSubmissionRepository.save(submission);
    return {
      id: submissionId,
    };
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to update' })
  @ApiBody({
    type: UpdateTaskPayload,
    description: 'The payload for updating a task',
  })
  @ApiResponse({
    status: 200,
    type: TaskEntity,
    description: 'The updated task',
  })
  async update(id: number, updateTaskDto: UpdateTaskPayload) {
    return `This action updates a task with ID ${id}`;
  }
  
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to delete' })
  @ApiResponse({ status: 200, description: 'The task has been deleted' })
  async remove(id: number) {
    return `This action removes a task with ID ${id}`;
  }
}
