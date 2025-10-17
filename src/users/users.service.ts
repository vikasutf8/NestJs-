import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RegisterUserDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/user-signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    console.log(registerUserDto, 'service');

    if (await this.FindUserByEmail(registerUserDto.email)) {
      throw new BadRequestException('User with this email already exists');
    }

    const saltRounds = await bcrypt.genSalt();
    registerUserDto.password = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );

    let user = this.usersRepository.create(
      registerUserDto as Partial<UserEntity>,
    );
    // console.log(user,"user")
    user = await this.usersRepository.save(user);

    delete (user as any)?.password; // typesafe

    return user;
  }

  async FindUserByEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  async signIn(signInUserdto: SignInUserDto):Promise<UserEntity>{
    // const user = await this.FindUserByEmail(signInUserdto.email);
    // if(!user) {
    //   throw new BadRequestException('Invalid email or password');
    // }
    // console.log(user)
    //NOTE : this usse password select field is false so do something else

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: signInUserdto.email })
      .getOne();

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordMatch = await bcrypt.compare(
      signInUserdto.password,
      user?.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    delete (user as any)?.password; // typesafe

    return user;
  }

  async accessToken(user: UserEntity):Promise<string>{
    //create access token via jwt
    return await sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h', }
    );
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() : Promise<UserEntity[]>{
    return await this.usersRepository.find();
  }

  async findOne(id: number) : Promise<UserEntity>{
    const user= await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
