import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET,
      secret: 'SUPER_JWT_SECRET_KEY',
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
