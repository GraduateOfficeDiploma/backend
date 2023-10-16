import { IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPayload {
  @IsString()
  @Length(3, 256)
  @ApiProperty({
    description: "The user's full name",
    minLength: 3,
    maxLength: 256,
  })
  fullName: string;

  @IsEmail()
  @ApiProperty({
    description: "The user's email address",
    format: 'email',
  })
  email: string;

  @IsString()
  @Length(8, 40)
  @ApiProperty({
    description: "The user's password (between 8 and 40 characters)",
    minLength: 8,
    maxLength: 40,
  })
  password: string;
}
