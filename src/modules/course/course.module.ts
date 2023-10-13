import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CloudinaryModule } from '../../libs/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseMemberEntity } from './entities/course-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, CourseMemberEntity]),
    CloudinaryModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
