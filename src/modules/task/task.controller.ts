import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { CustomRequest } from '../../types/request';
import { PaginationRequest } from '../../libs/request/pagination.request';
import { TaskEntity } from './entities/task.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
@ApiTags('Tasks') // Add a tag to group related endpoints in Swagger
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachments'))
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({
    type: CreateTaskPayload,
    description: 'The payload for creating a new task',
  })
  @ApiResponse({
    status: 201,
    type: CreateTaskPayload,
    description: 'The created task',
  })
  create(
    @Body() createTaskPayload: CreateTaskPayload,
    @Req() req: CustomRequest,
    @UploadedFiles() attachments: Express.Multer.File[],
  ) {
    createTaskPayload.attachments = attachments ?? [];
    return this.taskService.create(createTaskPayload, req.user);
  }

  @Post(':id/submit')
  @UseInterceptors(FilesInterceptor('attachments'))
  @ApiOperation({ summary: 'Submit a solution for a task' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to submit a solution for',
  })
  @ApiResponse({ status: 200, description: 'The solution has been submitted' })
  submitSolution(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @UploadedFiles() attachments: Express.Multer.File[],
  ) {
    return this.taskService.submitTaskSolution(id, attachments, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of tasks' })
  @ApiResponse({
    status: 200,
    type: [TaskEntity],
    description: 'A list of tasks',
  })
  find(
    @Req() req: CustomRequest,
    @Body() payload: PaginationRequest<TaskEntity>,
  ) {
    return this.taskService.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to find' })
  @ApiResponse({ status: 200, type: TaskEntity, description: 'The found task' })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
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
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskPayload) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to delete' })
  @ApiResponse({ status: 200, description: 'The task has been deleted' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
