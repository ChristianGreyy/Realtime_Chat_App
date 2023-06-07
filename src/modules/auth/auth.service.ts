import { Injectable } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {}

  async login(loginDto: LoginDto) {}
}
