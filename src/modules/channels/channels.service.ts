import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateChannelDto from './dtos/create-channel.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channel.entity';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';
import { Message } from '../messages/message.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel)
    private channelRepository: typeof Channel,

    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async getChannels(): Promise<Channel[]> {
    return await this.channelRepository.findAll({
      include: [
        {
          model: User,
          as: 'members',
        },
      ],
    });
  }

  async getChannelById(channelId: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      where: {
        id: channelId,
      },
    });
    return channel;
  }

  async getChannelByCode(code: string): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      where: {
        code: code,
      },
    });
    return channel;
  }

  async getChannelByUserId(userId: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      include: [
        {
          model: User,
          as: 'members',
          where: {
            id: userId,
          },
        },
      ],
    });
    return channel;
  }

  async createChannel(
    createChannelDto: any | CreateChannelDto,
  ): Promise<Channel> {
    const length = 10;
    const randomString = crypto.randomBytes(length).toString('hex');
    createChannelDto['code'] = randomString;
    return await this.channelRepository.create(createChannelDto);
  }

  async updateChannelById(
    updateChannelDto: any,
    channelId: number,
  ): Promise<Channel> {
    const channel = await this.getChannelById(channelId);
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    Object.assign(channel, updateChannelDto);
    return await channel.save();
  }

  async deleteChannelById(channelId: number): Promise<void> {
    const channel = await this.getChannelById(channelId);
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    await this.channelRepository.destroy({
      where: {
        id: channelId,
      },
    });
  }
}
