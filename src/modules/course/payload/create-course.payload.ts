import { IsString, Length } from 'class-validator';

export class CreateCoursePayload {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString({
    each: true,
  })
  schedule: string[];

  image: Express.Multer.File;
}
