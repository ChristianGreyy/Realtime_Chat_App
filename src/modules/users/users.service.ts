import {
  BadRequestException,
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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(Channel)
    private channelRepository: typeof Channel,
    @InjectModel(ChannelUser)
    private channelUserRepository: typeof ChannelUser,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
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
    user: any,
    joinChannelDto: JoinChannelDto,
  ): Promise<ChannelUser> {
    console.log(user);
    const channel = await this.channelRepository.findOne({
      where: {
        code: joinChannelDto.code,
      },
    });

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    const channelUser = await this.channelUserRepository.create({
      userId: user.id,
      channelId: channel.id,
    });

    return channelUser;
    // await user.addChannel(channel, { through: ChannelUser });

    // await this.userRepository.destroy({
    //   where: {
    //     id: userId,
    //   },
    // });
  }
}
