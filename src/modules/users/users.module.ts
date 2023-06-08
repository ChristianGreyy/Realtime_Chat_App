import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { Channel } from '../channels/channel.entity';
import { ChannelUser } from '../channel_users/channel_user.entity';
import { Message } from '../messages/message.entity';
import { ChannelUsersModule } from '../channel_users/channels.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Channel, ChannelUser, Message]),
    ChannelUsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
