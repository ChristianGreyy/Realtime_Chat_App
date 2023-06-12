import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import JoinChannelDto from './dtos/join-channel';
import { Channel } from '../channels/channel.entity';
import { ChannelUser } from '../channel_users/channel_user.entity';
import ChatMessageDto from './dtos/chat-message';
import { Message } from '../messages/message.entity';
import { ChannelUsersService } from '../channel_users/channel_users.service';
import { MessagesService } from '../messages/messages.service';
import { ChannelsService } from '../channels/channels.service';
const { Op } = require('sequelize');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,

    private channelUserSerivce: ChannelUsersService,
    private messageSerivce: MessagesService,
    private channelSerivce: ChannelsService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUsersByMe(userId: number): Promise<User[]> {
    const users = await this.userRepository.findAll({
      where: {
        id: {
          [Op.not]: userId,
        },
      },
    });
    return users;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async createUser(createUserDto: any | CreateUserDto): Promise<User> {
    // Check user exists ?
    const user: any = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 7);
    createUserDto['password'] = hashedPassword;

    return await this.userRepository.create(createUserDto);
  }

  async updateUserById(updateUserDto: any, userId: number): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return await user.save();
  }

  async deleteUserById(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.destroy({
      where: {
        id: userId,
      },
    });
  }

  async joinChannel(
    userId: number,
    joinChannelDto: JoinChannelDto,
  ): Promise<ChannelUser> {
    const channelUser = await this.channelUserSerivce.createChannelUser({
      userId,
      code: joinChannelDto.code,
    });
    return channelUser;
  }

  async getChannelsByMe(userId: number) {
    return this.channelSerivce.getChannelsByUserId(userId);
  }

  async getMessagesByMyChannel(userId: number, channelId: number) {
    const channel = await this.channelSerivce.getChannelByIdAndUserId(
      channelId,
      userId,
    );
    if (!channel) {
      throw new ForbiddenException('User is not in the channel');
    }
    return this.messageSerivce.getMessagesByChannelId(channelId);
  }

  async chatMessage(
    userId: number,
    chatMessageDto: ChatMessageDto,
  ): Promise<Message> {
    const message = await this.messageSerivce.createMessage({
      userId: userId,
      ...chatMessageDto,
    });
    return message;
  }
}
