
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from '../../users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity | null;
    }
  }
}



@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      console.log(token);
    // req.currentUser = verifyToken(token); // Assuming verifyToken is a function that verifies the JWT and returns the user payload
        const usertoken = verify(token, process.env.JWT_SECRET!);
        console.log(usertoken);
        const { id } = usertoken as JwtPayload;
        const currentUser = await this.usersService.findOne(+id);
    //   req['currentUser'] =
        req.currentUser = currentUser;
    } else {
    //   req['currentUser'] = null;
        req.currentUser = null;
    }
    next();
  }
}


interface JwtPayload {
    id: string;
}