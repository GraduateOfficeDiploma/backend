import { IsDate, IsString, IsUUID } from 'class-validator';

export class CreateTaskPayload {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  dueDate: Date;

  @IsUUID()
  courseId: string;

  attachments: Express.Multer.File[];
}
