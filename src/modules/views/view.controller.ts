import { Controller, Get, Render } from '@nestjs/common';

@Controller('views')
export class ViewsController {
  @Get('conversation')
  @Render('conversation')
  async getConversations() {}
}
