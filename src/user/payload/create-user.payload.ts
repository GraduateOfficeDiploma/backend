import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserPayload {
  @IsString()
  @Length(3, 256)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 40)
  password: string;
}
