import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name must be a string' })
    firstName: string;

    @IsString({ message: 'Last name must be a string' })
    lastName?: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
