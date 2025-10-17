import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/user-register.dto';
import { UserEntity } from './entities/user.entity';
import { SignInUserDto } from './dto/user-signIn.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    return { user: await this.usersService.register(registerUserDto) } as any;
  }

  @Post('signIn')
  async signIn(@Body() signInUserdto: SignInUserDto): Promise<{
    user: UserEntity;
    access_token: string;
  }> {
    const user = await this.usersService.signIn(signInUserdto);
    const access_token = await this.usersService.accessToken(user);
    return { user, access_token };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
