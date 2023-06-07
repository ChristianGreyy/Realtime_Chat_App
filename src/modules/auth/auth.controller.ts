import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  async register(registerDto: RegisterDto) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return token;
  }
}
