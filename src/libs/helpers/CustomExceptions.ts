import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceExistsException extends HttpException {
  constructor(entityName: string) {
    super(`${entityName} already exists`, HttpStatus.SEE_OTHER);
  }
}
