/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Enter your first Name' })
  @IsNotEmpty({ message: 'First Name is required' })
  firstName: string;

  @IsString({ message: 'Enter your last Name' })
  lastName?: string;

  @IsEmail({}, { message: 'Enter valid Email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  bio: string;

  profilePicture?: string;
}
