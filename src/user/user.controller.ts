import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { IUserResponse } from './userResponse.interface';

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
}
