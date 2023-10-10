import { Injectable } from '@nestjs/common';
import { CreateCoursePayload } from './payload/create-course.payload';
import { UpdateCoursePayload } from './payload/update-course.payload';
import { CommandResponse } from '../../libs/response/command.response';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  create(createCoursePayload: CreateCoursePayload): CommandResponse {
    const course = new CourseEntity();
    return {
      id: course.id,
    };
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: string) {
    return `This action returns a #${id} course`;
  }

  update(id: string, updateCoursePayload: UpdateCoursePayload) {
    return `This action updates a #${id} course`;
  }

  remove(id: string) {
    return `This action removes a #${id} course`;
  }
}
