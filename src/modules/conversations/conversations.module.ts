import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.entity';
import { Conversation } from './conversation.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Conversation])],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
