import { Injectable } from '@nestjs/common';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { UserEntity } from '../user/entities/user.entity';
import { CommandResponse } from '../../libs/response/command.response';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../../libs/cloudinary/cloudinary.service';
import { AttachmentEntity } from './entities/attachment.entity';
import { TaskSubmissionEntity } from './entities/task-submission.entity';

@Injectable()
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

  find() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a task with ID ${id}`;
  }

  update(id: number, updateTaskDto: UpdateTaskPayload) {
    return `This action updates a task with ID ${id}`;
  }

  remove(id: number) {
    return `This action removes a task with ID ${id}`;
  }
}
