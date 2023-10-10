import { CreateUserPayload } from './create-user.payload';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserPayload extends PartialType(CreateUserPayload) {}
