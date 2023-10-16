import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { CloudinaryModule } from '../../libs/cloudinary/cloudinary.module';
import { ApiTags } from '@nestjs/swagger';
import { TaskSubmissionEntity } from './entities/task-submission.entity';
import { AttachmentEntity } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      TaskSubmissionEntity,
      AttachmentEntity,
    ]),
    CloudinaryModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
@ApiTags('Task Module') // Add a tag to group related endpoints in Swagger
export class TaskModule {}
