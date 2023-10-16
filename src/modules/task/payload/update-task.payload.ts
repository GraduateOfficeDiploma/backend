import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskPayload } from './create-task.payload';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskPayload extends PartialType(CreateTaskPayload) {
  @ApiProperty({
    required: false,
    description: 'The updated title of the task',
  })
  title?: string;

  @ApiProperty({
    required: false,
    description: 'The updated description of the task',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: 'The updated due date of the task',
    type: Date,
  })
  dueDate?: Date;

  @ApiProperty({
    required: false,
    description: 'Updated attachments related to the task (if any)',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  attachments?: Express.Multer.File[];
}
