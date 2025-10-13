import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user.service';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from '../constant/jwt.constant';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      req['user'] = null;

      return res.status(401).json({
        statusCode: 401,
        message: 'No token provided',
        error: 'Unauthorized',
      });
    }

    try {
      const decoded = verify(token, jwtConstants.secret);
      req['user'] = decoded;
    } catch (error) {
      req['user'] = null;
      console.log(req['user'], 'user token error');
      return res.status(401).json({
        statusCode: 401,
        message: 'Invalid token',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error: error?.message as unknown as string,
      });
    }
    // console.log(req['user'], 'user token');
    next();
  }
}
