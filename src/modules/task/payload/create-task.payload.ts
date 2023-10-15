import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskPayload {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'A description of the task' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The due date of the task', type: Date })
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    description: 'Attachments related to the task (if any)',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  attachments: Express.Multer.File[];
}