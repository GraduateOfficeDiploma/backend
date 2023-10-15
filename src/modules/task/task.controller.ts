import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Task Module') // Add a tag to group related endpoints in Swagger
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskPayload, description: 'The payload for creating a new task' })
  @ApiResponse({ status: 201, type: CreateTaskPayload, description: 'The created task' })
  @Post()
  create(@Body() createTaskPayload: CreateTaskPayload) {
    return this.taskService.create(createTaskPayload);
  }
  
  @ApiOperation({ summary: 'Get a list of tasks' })
  @ApiResponse({ status: 200, type: [CreateTaskPayload], description: 'A list of tasks' })
  @Get()
  find() {
    return this.taskService.find();
  }
  
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to find' })
  @ApiResponse({ status: 200, type: CreateTaskPayload, description: 'The found task' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }
  
   @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to update' })
  @ApiBody({ type: UpdateTaskPayload, description: 'The payload for updating a task' })
  @ApiResponse({ status: 200, type: CreateTaskPayload, description: 'The updated task' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskPayload) {
    return this.taskService.update(+id, updateTaskDto);
  }
  
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to delete' })
  @ApiResponse({ status: 200, description: 'The task has been deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
