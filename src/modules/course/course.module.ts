import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CloudinaryModule } from '../../libs/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseMemberEntity } from './entities/course-member.entity';
import { ApiTags } from '@nestjs/swagger';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, CourseMemberEntity]),
    CloudinaryModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
@ApiTags('Courses Module') // Tag for this module
export class CourseModule {}
