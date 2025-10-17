import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { SignInUserDto } from './user-signIn.dto';

export class RegisterUserDto extends SignInUserDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    role: string[];
}