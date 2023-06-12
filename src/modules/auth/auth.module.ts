import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    UsersModule,
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
