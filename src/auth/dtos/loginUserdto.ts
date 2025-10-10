import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
