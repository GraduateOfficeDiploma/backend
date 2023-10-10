import { IsDate, IsString } from 'class-validator';

export class CreateTaskPayload {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  dueDate: Date;

  attachments: Express.Multer.File[];
}
