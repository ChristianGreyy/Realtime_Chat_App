import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.entity';
import { Channel } from './channel.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Channel])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService],
})
export class ChannelsModule {}
