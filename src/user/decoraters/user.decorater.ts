import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../user.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request['user'] as UserEntity;
    // console.log(user, 'user in decorator');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
);
