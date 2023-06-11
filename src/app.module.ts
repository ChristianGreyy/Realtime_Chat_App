import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { User } from './modules/users/user.entity';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { Conversation } from './modules/conversations/conversation.entity';
import { TokensModule } from './modules/tokens/tokens.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { Channel } from './modules/channels/channel.entity';
import { Message } from './modules/messages/message.entity';
import { ChannelUser } from './modules/channel_users/channel_user.entity';
import { ViewsModule } from './modules/views/view.module';
import { SocketGateway } from './modules/socket/socket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Conversation, Channel, Message, ChannelUser],
    }),
    AuthModule,
    UsersModule,
    ConversationsModule,
    ChannelsModule,
    ViewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
