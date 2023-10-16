import { CreateUserPayload } from './create-user.payload';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPayload extends PartialType(CreateUserPayload) {
  @ApiProperty({
    description: "The user's full name (optional)",
    required: false,
  })
  fullName?: string;

  @ApiProperty({
    description: "The user's email address (optional)",
    format: 'email',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: "The user's password (optional)",
    required: false,
  })
  password?: string;
}
