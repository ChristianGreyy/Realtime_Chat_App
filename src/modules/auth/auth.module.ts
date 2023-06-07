import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User]), UsersModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
