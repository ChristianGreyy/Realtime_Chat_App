import { Module } from '@nestjs/common';
import { ViewsController } from './view.controller';

@Module({
  imports: [],
  controllers: [ViewsController],
  providers: [],
  exports: [],
})
export class ViewsModule {}
