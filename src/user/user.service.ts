import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async userRegister(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const user = await this.userRepository.save(createUserDto);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return user;
  }
}
