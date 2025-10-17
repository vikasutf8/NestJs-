import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/user-register.dto';
import { UserEntity } from './entities/user.entity';
import { SignInUserDto } from './dto/user-signIn.dto';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateGuard } from 'src/shared/guards/authenticate.gurad';
import { AuthorizeRoles } from 'src/shared/decorators/authorize-role.decorator';
import { AuthorizationGuard } from 'src/shared/guards/authorization.guard';
import { UserRole } from 'src/shared/common/user-role.enum';

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

  // @AuthorizeRoles(UserRole.ADMIN)
  @UseGuards(AuthenticateGuard,AuthorizationGuard([UserRole.ADMIN]))
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthenticateGuard)
  @Get('me')
  getMe(@CurrentUserDecorator() currentUser :UserEntity) {
    return currentUser;
  }



  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
