import { IsDate, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskPayload {
  @ApiProperty({ type: String, description: 'Title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'Description of the task' })
  @IsString()
  description: string;

  @ApiProperty({ type: Date, description: 'Due date of the task' })
  @IsDate()
  dueDate: Date;

  @ApiProperty({ type: String, description: 'ID of the course for which the task is created' })
  @IsUUID()
  courseId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Attachments for the task',
    isArray: true,
  })
  attachments: Express.Multer.File[];
}