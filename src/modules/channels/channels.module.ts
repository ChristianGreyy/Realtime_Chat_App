import { Module } from '@nestjs/common';
import { ConversationsController } from './channels.controller';
import { ConversationsService } from './channels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.entity';
import { Conversation } from './channel.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Conversation])],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
