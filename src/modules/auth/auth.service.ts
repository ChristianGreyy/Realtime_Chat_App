import {
  BadRequestException,
  Inject,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import RegisterDto from './dtos/register.dto';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user || user.isCodeUsed === false) {
      return null;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return null;
    }
    return user;
  }

  async login(user: any): Promise<any> {
    const payload = { phoneNumber: user.phoneNumber, sub: user.id };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);
    user.refreshToken = refreshToken;
    await user.save();
    return {
      accessToken,
      refreshToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    return await this.usersService.createUser(registerDto);
  }
}
