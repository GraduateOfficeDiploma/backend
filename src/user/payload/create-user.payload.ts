import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserPayload {
  @IsString()
  @Length(3, 100)
  firstName: string;

  @IsString()
  @Length(3, 100)
  lastName: string;

  @IsString()
  @Length(3, 100)
  middleName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 40)
  password: string;
}
