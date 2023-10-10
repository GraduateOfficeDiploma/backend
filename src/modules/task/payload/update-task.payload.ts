import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskPayload } from './create-task.payload';

export class UpdateTaskPayload extends PartialType(CreateTaskPayload) {}
