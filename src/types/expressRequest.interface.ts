import { UserEntity } from '@app/user/user.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: UserEntity | null;
}
