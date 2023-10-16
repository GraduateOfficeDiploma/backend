import { Injectable } from '@nestjs/common';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { UserEntity } from '../user/entities/user.entity';
import { CommandResponse } from '../../libs/response/command.response';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../../libs/cloudinary/cloudinary.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('tasks') // Define a tag for your API
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskPayload })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: CommandResponse,
  })
  
  async create(
    @ApiBody({ type: CreateTaskPayload }) createTaskPayload: CreateTaskPayload,
    @User() user: UserEntity,
  ): Promise<CommandResponse> {
	// Implementation details
    const task = new TaskEntity();
    task.course = createTaskPayload.courseId;
    task.title = createTaskPayload.title;
    task.description = createTaskPayload.description;
    task.dueDate = createTaskPayload.dueDate;
    task.createdBy = user;

    const uploadAttachments = createTaskPayload.attachments.map((a) =>
      this.cloudinaryService.uploadDocument(a),
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a list of all tasks.',
    type: TaskEntity,
    isArray: true,
  })
  
  find() {
    return 'This action returns all tasks';
  }

  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'The unique identifier of the task.',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a single task by its unique ID.',
    type: TaskEntity,
  })
  
  findOne(@Param('id') id: string) {
    return `This action returns a task with ID: ${id}`;
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'The unique identifier of the task to be updated.',
    required: true,
  })
  @ApiBody({ type: UpdateTaskPayload })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: TaskEntity,
  })
  
  update(@Param('id') id: string, @ApiBody({ type: UpdateTaskPayload }) updateTaskDto: UpdateTaskPayload) {
    return `This action updates a task with ID: ${id}`;
  }

  @ApiOperation({ summary: 'Remove a task by ID' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'The unique identifier of the task to be removed.',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully removed.',
    type: TaskEntity,
  })
  
  remove(@Param('id') id: string) {
    return `This action removes a task with ID: ${id}`;
  }
}