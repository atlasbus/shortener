import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { LinkModule } from '../link/link.module';
import { HistoryModule } from '../history/history.module';

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [LinkModule, HistoryModule],
})
export class ApiModule {}
