import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginPayload {
  @ApiProperty({
    description: 'The email address of the user',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 8,
  })
  @IsString()
  password: string;
}