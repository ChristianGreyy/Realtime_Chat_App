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

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel)
    private channelRepository: typeof Channel,

    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async getChannels(): Promise<Channel[]> {
    return await this.channelRepository.findAll({});
  }

  async getChannelById(channelId: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      where: {
        id: channelId,
      },
    });
    return channel;
  }

  async createChannel(
    createChannelDto: any | CreateChannelDto,
  ): Promise<Channel> {
    // Check channel exists ?
    const sender: any = await this.userRepository.findByPk(
      createChannelDto.senderId,
    );
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }
    const receiver: any = await this.userRepository.findByPk(
      createChannelDto.receiverId,
    );
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }
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
