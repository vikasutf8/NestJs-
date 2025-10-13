import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Enter valid Email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Enter your password' })
  password: string;
}
