import { Injectable } from '@nestjs/common';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { UserEntity } from '../user/entities/user.entity';
import { CommandResponse } from '../../libs/response/command.response';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../../libs/cloudinary/cloudinary.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
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

    task.attachmentUrls = await Promise.all(uploadAttachments);

    await this.taskRepository.save(task);
    return {
      id: task.id,
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