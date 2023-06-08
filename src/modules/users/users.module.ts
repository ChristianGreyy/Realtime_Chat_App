import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { Channel } from '../channels/channel.entity';
import { ChannelUser } from '../channel_users/channel_user.entity';
import { Message } from '../messages/message.entity';
import { ChannelUsersModule } from '../channel_users/channel_users.module';
import { MessagesModule } from '../messages/messages.module';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    ChannelUsersModule,
    MessagesModule,
    ChannelsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
