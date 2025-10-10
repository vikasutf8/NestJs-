import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async userRegister(@Body('user') createUserDto: CreateUserDto) {
    return await this.userService.userRegister(createUserDto);
  }
}
