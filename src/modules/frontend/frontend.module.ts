import { Module } from '@nestjs/common';
import { HistoryModule } from '../history/history.module';
import { LinkModule } from '../link/link.module';
import { FrontendController } from './frontend.controller';

@Module({
  controllers: [FrontendController],
  imports: [LinkModule, HistoryModule],
})
export class FrontendModule {}
