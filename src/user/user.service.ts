import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dtos/registerUser.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/user.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModel.create({
        ...registerUserDto,
        role: Role.USER,
      });
    } catch (error: unknown) {
      const e = error as { code?: number };
      if (e instanceof Error) {
        const DUPLICATE_KEY_ERROR_CODE = 11000;
        if (e.code === DUPLICATE_KEY_ERROR_CODE) {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
  async findUserById(id: string) {
    return await this.userModel.findById(id).select('-password').exec();
  }
}
