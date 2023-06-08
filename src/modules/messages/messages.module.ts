import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [SequelizeModule.forFeature([Message]), ChannelsModule],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
