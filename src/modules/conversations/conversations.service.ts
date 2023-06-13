import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateConversationDto from './dtos/create-conversation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Conversation } from './conversation.entity';
import { User } from '../users/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation)
    private conversationRepository: typeof Conversation,

    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async getConversations(
    senderId: number,
    receiverId: number,
  ): Promise<Conversation[]> {
    console.log(senderId, receiverId);
    return await this.conversationRepository.findAll({
      where: {
        [Op.or]: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender',
        },
        {
          model: User,
          as: 'receiver',
        },
      ],
    });
  }

  async getConversationById(conversationId: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
    });
    return conversation;
  }

  async createConversation(
    createConversationDto: any | CreateConversationDto,
    senderId: number,
  ): Promise<Conversation> {
    const receiver: any = await this.userRepository.findByPk(
      createConversationDto.receiverId,
    );
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }
    createConversationDto['senderId'] = senderId;
    return await this.conversationRepository.create(createConversationDto);
  }

  async updateConversationById(
    updateConversationDto: any,
    conversationId: number,
  ): Promise<Conversation> {
    const conversation = await this.getConversationById(conversationId);
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    Object.assign(conversation, updateConversationDto);
    return await conversation.save();
  }

  async deleteConversationById(conversationId: number): Promise<void> {
    const conversation = await this.getConversationById(conversationId);
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    await this.conversationRepository.destroy({
      where: {
        id: conversationId,
      },
    });
  }
}
