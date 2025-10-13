// eslint-disable-next-line @typescript-eslint/await-thenable
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserResponse } from './userResponse.interface';
import { JwtService } from '@nestjs/jwt';
import { STATUS_CODES } from 'http';
import { LoginUserDto } from './dtos/loginUser.dto';
import * as bcrypt from 'bcrypt';
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

    const userbyEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userbyEmail) {
      throw new HttpException(
        {
          statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY,
          message: 'Email already exists',
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      // 422 Unprocessable Content
    }
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

  async userLogin(loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException(
        {
          statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY,
          message: 'Email not found',
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        {
          statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY,
          message: 'Password Wrong',
          error: 'UnAuthoricated User',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // create access token

    return this.generateUserResponse(user);
  }

  async FindbyId(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        {
          statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY,
          message: 'User not found',
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }

}
