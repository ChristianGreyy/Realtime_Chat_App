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
import { TokensService } from '../tokens/tokens.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password);

    const user: any = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      return null;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return null;
    }
    return user;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.tokensService.generateAccessToken(payload);
    const refreshToken = await this.tokensService.generateRefreshToken(payload);
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
