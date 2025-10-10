import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { LoginUserDto } from './dtos/loginUserdto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
   @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto){
    
    
    return await this.authService.UserRegister(registerUserDto);
  }


  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto){
    
    
    return await this.authService.UserLogin(loginUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile( @Request() req) {
    const user = req.user;
   
    return await this.authService.getUserProfile(user);
  }
}
