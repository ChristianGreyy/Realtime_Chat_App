import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import CreateChannelDto from './dtos/create-channel.dto';
import UpdateChannelDto from './dtos/update-channel.dto';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/enums/role';
import { RolesGuard } from '../auth/roles.guard';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get('/')
  async getChannels() {
    const channels = await this.channelsService.getChannels();
    return channels;
  }

  @Post('/')
  async createChannel(@Body() createChannelDto: CreateChannelDto) {
    const newChannel = await this.channelsService.createChannel(
      createChannelDto,
    );
    return newChannel;
  }

  @Get('/:channelId')
  async getChannelById(@Param('channelId', ParseIntPipe) channelId: number) {
    const channel = await this.channelsService.getChannelById(channelId);
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    return channel;
  }

  @Put('/:channelId')
  async updateChannelById(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    const channel = await this.channelsService.updateChannelById(
      updateChannelDto,
      channelId,
    );
    return { message: 'Update channel successfully', channel };
  }

  @Delete('/:channelId')
  async deleteChannelById(@Param('channelId', ParseIntPipe) channelId: number) {
    await this.channelsService.deleteChannelById(channelId);
    return { message: 'Delete channel successfully' };
  }
}
