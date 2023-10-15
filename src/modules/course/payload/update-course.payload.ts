import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursePayload } from './create-course.payload';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoursePayload extends PartialType(CreateCoursePayload) {
  @ApiProperty({
    required: false,
    description: 'The new name of the course (2-50 characters)',
    minLength: 2,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'An updated schedule for the course (array of strings)',
    type: [String],
  })
  schedule: string[];

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
    description: 'An updated course image (file upload)',
  })
  image: Express.Multer.File;
}