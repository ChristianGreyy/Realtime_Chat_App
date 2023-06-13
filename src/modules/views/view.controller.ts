import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('views')
export class ViewsController {
  @Get('conversation/:userId')
  @Render('conversation')
  async getConversations() {}

  @Get('login')
  @Render('login')
  async getLogin() {}
}
