import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ApiTags } from '@nestjs/swagger';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
@ApiTags('Task Module') // Add a tag to group related endpoints in Swagger
export class TaskModule {}
