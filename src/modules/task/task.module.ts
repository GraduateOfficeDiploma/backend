import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { CloudinaryModule } from '../../libs/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), CloudinaryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
