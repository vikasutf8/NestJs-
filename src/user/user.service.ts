// eslint-disable-next-line @typescript-eslint/await-thenable
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserResponse } from './userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async userRegister(createUserDto: CreateUserDto): Promise<IUserResponse> {
    // const newUser = new UserEntity();
    // Object.assign(newUser, createUserDto);
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return this.generateUserResponse(user);
  }

  private generateUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: '',
      },
    };
  }
}
