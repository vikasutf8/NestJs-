import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')// auth/register
export class AppController {

  //this constructor is DI as using -- and using Data/Autowired
  constructor(private readonly appService: AppService) {}
  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
}
