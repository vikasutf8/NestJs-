// eslint-disable-next-line @typescript-eslint/await-thenable
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserResponse } from './userResponse.interface';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constant/jwt.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async userRegister(createUserDto: CreateUserDto): Promise<IUserResponse> {
    // const newUser = new UserEntity();
    // Object.assign(newUser, createUserDto);
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return this.generateUserResponse(user);
  }

  private async generateUserResponse(user: UserEntity): Promise<IUserResponse> {
    // const { hashPassword, ...userWithoutPassword } = user;
    return {
      user: {
        ...user,
        token: await this.generateUserToken(user),
      },
    };
  }

  private async generateUserToken(user: UserEntity): Promise<string> {
    return await this.jwtService.signAsync({
      sub: user.id,
      firstName: user.firstName,
      email: user.email,
    });
  }
}
