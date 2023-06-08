import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.entity';
import { Message } from './message.entity';
import CreateMessageDto from './dtos/create-message.dto';
import { ChannelsService } from '../channels/channels.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private messageRepository: typeof Message,

    private channelService: ChannelsService, // @InjectModel(User) // private userRepository: typeof User,
  ) {}

  async getMessages(): Promise<Message[]> {
    return await this.messageRepository.findAll({});
  }

  async getMessagesByChannelId(channelId: number): Promise<Message[]> {
    const messages = await this.messageRepository.findAll({
      where: {
        channelId: channelId,
      },
    });
    return messages;
  }

  async getMessageById(messageId: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: {
        id: messageId,
      },
    });
    return message;
  }

  async createMessage(
    createMessageDto: any | CreateMessageDto,
  ): Promise<Message> {
    // Check message exists ?
    const channel = await this.channelService.getChannelById(
      createMessageDto.channelId,
    );
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    const message = await this.messageRepository.create({
      userId: createMessageDto.userId,
      channelId: channel.id,
      text: createMessageDto.text,
    });

    return message;
  }

  async updateMessageById(
    updateMessageDto: any,
    messageId: number,
  ): Promise<Message> {
    const message = await this.getMessageById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    Object.assign(message, updateMessageDto);
    return await message.save();
  }

  async deleteMessageById(messageId: number): Promise<void> {
    const message = await this.getMessageById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    await this.messageRepository.destroy({
      where: {
        id: messageId,
      },
    });
  }
}
