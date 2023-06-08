import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.entity';
import { ChannelUser } from './channel_user.entity';
import CreateChannelUserDto from './dtos/create-channel-user.dto';
import { ChannelsService } from '../channels/channels.service';

@Injectable()
export class ChannelUsersService {
  constructor(
    @InjectModel(ChannelUser)
    private channelUserRepository: typeof ChannelUser,

    private channelService: ChannelsService, // @InjectModel(User) // private userRepository: typeof User,
  ) {}

  async getChannelUsers(): Promise<ChannelUser[]> {
    return await this.channelUserRepository.findAll({});
  }

  async getChannelUserById(channelUserId: number): Promise<ChannelUser> {
    const channelUser = await this.channelUserRepository.findOne({
      where: {
        id: channelUserId,
      },
    });
    return channelUser;
  }

  async createChannelUser(
    createChannelUserDto: any | CreateChannelUserDto,
  ): Promise<ChannelUser> {
    // Check channelUser exists ?
    const channel = await this.channelService.getChannelByCode(
      createChannelUserDto.code,
    );
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    console.log({
      userId: createChannelUserDto.userId,
      channelId: channel.id,
    });
    const channelUser = await this.channelUserRepository.create({
      userId: createChannelUserDto.userId,
      channelId: channel.id,
    });

    return channelUser;
  }

  async updateChannelUserById(
    updateChannelUserDto: any,
    channelUserId: number,
  ): Promise<ChannelUser> {
    const channelUser = await this.getChannelUserById(channelUserId);
    if (!channelUser) {
      throw new NotFoundException('ChannelUser not found');
    }
    Object.assign(channelUser, updateChannelUserDto);
    return await channelUser.save();
  }

  async deleteChannelUserById(channelUserId: number): Promise<void> {
    const channelUser = await this.getChannelUserById(channelUserId);
    if (!channelUser) {
      throw new NotFoundException('ChannelUser not found');
    }
    await this.channelUserRepository.destroy({
      where: {
        id: channelUserId,
      },
    });
  }
}
