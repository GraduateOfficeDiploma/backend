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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { CustomRequest } from '../../types/request';
import { PaginationRequest } from '../../libs/request/pagination.request';
import { TaskEntity } from './entities/task.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachments'))
  create(
    @Body() createTaskPayload: CreateTaskPayload,
    @Req() req: CustomRequest,
    @UploadedFiles() attachments: Express.Multer.File[],
  ) {
    createTaskPayload.attachments = attachments ?? [];
    return this.taskService.create(createTaskPayload, req.user);
  }

  @Post(':id/submit')
  submitSolution(@Body() _, @Req() req: CustomRequest) {}

  @Get()
  find(
    @Req() req: CustomRequest,
    @Body() payload: PaginationRequest<TaskEntity>,
  ) {
    return this.taskService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskPayload) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
