import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RegisterUserDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async register(registerUserDto: RegisterUserDto) : Promise<UserEntity> {
    console.log(registerUserDto,"service")

    if(await this.FindUserByEmail(registerUserDto.email)) {
      throw new BadRequestException('User with this email already exists');
    }

    const saltRounds = await bcrypt.genSalt();
    registerUserDto.password = await bcrypt.hash(registerUserDto.password,saltRounds );

    let user = this.usersRepository.create(registerUserDto as Partial<UserEntity>);
    // console.log(user,"user")
    user = await this.usersRepository.save(user);

    delete (user as any)?.password; // typesafe 

    return user;
  }


  async FindUserByEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
