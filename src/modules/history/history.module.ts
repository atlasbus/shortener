import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntity } from './entities';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
