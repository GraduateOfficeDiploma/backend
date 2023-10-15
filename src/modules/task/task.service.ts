import { Injectable } from '@nestjs/common';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskPayload) {
    return 'This action adds a new task';
  }

  find() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskPayload) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
