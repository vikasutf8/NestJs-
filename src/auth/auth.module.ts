import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ 
      envFilePath: '.development.env',
      isGlobal: true 
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' }, // Changed to 60 minutes for better usability
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
 