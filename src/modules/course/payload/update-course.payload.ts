import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursePayload } from './create-course.payload';

export class UpdateCoursePayload extends PartialType(CreateCoursePayload) {}
