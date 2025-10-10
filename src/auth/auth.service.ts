import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/loginUserdto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){};

  /**
   1. email exists
   2. hash password' done
   3. stored db done
   4. genrate token
   5. send token /attached

   */

   //but some are user models or auth 

    async UserRegister(registerUserDto: RegisterUserDto){
        
        console.log(registerUserDto);
        const sallt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(registerUserDto.password, sallt);
        registerUserDto.password = hashPassword;
        const newUser = await this.userService.createUser({...registerUserDto, password: hashPassword});
        console.log(newUser);
        const tokenPaylaod = {
            email: newUser.email,
            role: newUser.role,
            firstName: newUser.firstName,
            sub: newUser._id,
        };
        const token = await this.jwtService.signAsync(tokenPaylaod);
        return {
           access_token: token,
            
        };
    }

    /**
     1. email exists
     2. password match
        3. genrate token
        4. send token /attached
     */
    async UserLogin(loginUserDto: LoginUserDto){
        const user = await this.userService.findUserByEmail(loginUserDto.email);
        if(!user){
            throw new Error('User not found');
        }
        
        
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if(!isPasswordValid){
            throw new Error('Password is not valid');
        }
        const tokenPaylaod = {
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            sub: user._id,
        };
        const token = await this.jwtService.signAsync(tokenPaylaod);
        return {
            access_token: token,
        };
    }

    async getUserProfile(user: any){
        const userProfile = await this.userService.findUserById(user.sub);
        if(!userProfile){
            throw new Error('User not found');
        }
        return userProfile
    }

}
