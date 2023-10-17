import { IsNumber } from 'class-validator';

export class EvaluateSubmissionPayload {
  @IsNumber()
  grade: number;
}