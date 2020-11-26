import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './entities';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
