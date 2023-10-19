import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedTaskResponse {
  @ApiProperty({ type: String, description: 'The ID of the created task' })
  id: string;
}