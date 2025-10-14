import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { IUserResponse } from './userResponse.interface';
import { User } from './decoraters/user.decorater';
import { UserEntity } from './user.entity';
import { AuthGuardGuard } from './auth-guard/auth-guard.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async userRegister(@Body('user') createUserDto: CreateUserDto) {
    return await this.userService.userRegister(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto): Promise<IUserResponse> {
    return await this.userService.userLogin(loginUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuardGuard)
  getUser(@User() user: UserEntity): Promise<IUserResponse> {
    // console.log(user, 'user');

    return this.userService.FindbyId(user.id);
  }
}
