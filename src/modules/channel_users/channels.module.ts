import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChannelUsersService } from './channel_user.service';
import { ChannelUser } from './channel_user.entity';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [SequelizeModule.forFeature([ChannelUser]), ChannelsModule],
  providers: [ChannelUsersService],
  exports: [ChannelUsersService],
})
export class ChannelUsersModule {}
