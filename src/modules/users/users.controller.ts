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
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import JoinChannelDto from './dtos/join-channel';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import ChatMessageDto from './dtos/chat-message';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/me')
  async getUsersByMe(@Request() req) {
    const users = await this.userService.getUsersByMe(req.user.id);
    return users;
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Get('/:userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put('/:userId')
  async updateUserById(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUserById(updateUserDto, userId);
    return { message: 'Update user successfully', user };
  }

  @Delete('/:userId')
  async deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    await this.userService.deleteUserById(userId);
    return { message: 'Delete user successfully' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/join-channel')
  async joinChannel(@Request() req, @Body() joinChannelDto: JoinChannelDto) {
    const newChannelUser = await this.userService.joinChannel(
      req.user.id,
      joinChannelDto,
    );
    return {
      message: 'Join channel successfully',
      newChannelUser,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/me/channels')
  async getChannelsByMe(@Request() req) {
    const channels = await this.userService.getChannelsByMe(req.user.id);
    return {
      channels,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/me/channels/:channelId')
  async getMessagesByMyChannel(
    @Request() req,
    @Param('channelId') channelId: number,
  ) {
    const channels = await this.userService.getMessagesByMyChannel(
      req.user.id,
      channelId,
    );
    return {
      channels,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/chat-message')
  async chatMessage(@Request() req, @Body() chatMessageDto: ChatMessageDto) {
    const newChannelUser = await this.userService.chatMessage(
      req.user.id,
      chatMessageDto,
    );
    return {
      message: 'Join channel successfully',
      newChannelUser,
    };
  }
}
