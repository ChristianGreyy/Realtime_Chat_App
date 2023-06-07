import { Controller } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  async register(registerDto: RegisterDto) {}

  async login(loginDto: LoginDto) {}
}
