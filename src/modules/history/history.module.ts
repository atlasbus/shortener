import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from '../link/link.module';
import { HistoryEntity } from './entities';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity]), LinkModule],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
