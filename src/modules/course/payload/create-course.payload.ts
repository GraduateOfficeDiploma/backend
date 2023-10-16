import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoursePayload {
  @ApiProperty({
    example: 'Course Name',
    description: 'The name of the course (2-50 characters)',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: ['Monday 10:00 AM', 'Wednesday 2:00 PM'],
    description: 'An array of strings representing the schedule for the course',
    type: [String],
  })
  @IsString({ each: true })
  schedule: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'An image file representing the course image',
  })
  image: Express.Multer.File;
}
