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
import { ConversationsService } from './conversations.service';
import CreateConversationDto from './dtos/create-conversation.dto';
import UpdateConversationDto from './dtos/update-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationService: ConversationsService) {}

  @Get('/')
  async getConversations() {
    const conversations = await this.conversationService.getConversations();
    return conversations;
  }

  @Post('/')
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ) {
    console.log('ok');
    const newConversation = await this.conversationService.createConversation(
      createConversationDto,
    );
    return newConversation;
  }

  @Get('/:conversationId')
  async getConversationById(
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    const conversation = await this.conversationService.getConversationById(
      conversationId,
    );
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  @Put('/:conversationId')
  async updateConversationById(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    const conversation = await this.conversationService.updateConversationById(
      updateConversationDto,
      conversationId,
    );
    return { message: 'Update conversation successfully', conversation };
  }

  @Delete('/:conversationId')
  async deleteConversationById(
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    await this.conversationService.deleteConversationById(conversationId);
    return { message: 'Delete conversation successfully' };
  }
}
