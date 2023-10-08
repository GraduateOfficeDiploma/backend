import { UserEntity } from '../user/entities/user.entity';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: UserEntity;
}
