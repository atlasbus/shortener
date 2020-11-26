import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { HistoryService } from '../history/history.service';
import { LinkEntity } from '../link/entities';
import { LinkService } from '../link/link.service';
import { CreateRequestDto } from './dto';
import { GetStatParamDto } from './dto/get-stat-param.dto';
import { StatResponseDto } from './dto/stat-response.dto';

@Injectable()
export class ApiService {
  constructor(
    private readonly linkService: LinkService,
    private historyService: HistoryService,
  ) {}

  async createLink(data: CreateRequestDto): Promise<LinkEntity> {
    return await this.linkService.createLink(data);
  }

  async getLink(domain: string, slug: string): Promise<LinkEntity> {
    try {
      return await this.linkService.getLink(domain, slug);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException({ domain, slug });
      }
      throw e;
    }
  }

  async getHistory(params: GetStatParamDto): Promise<StatResponseDto> {
    const { domain, granularity, slug } = params;
    const link = await this.linkService.getLink(domain, slug);
    const stat = await this.historyService.getHistory(link, granularity);
    return {
      clicks: stat.map((s) => s.clicks),
      labels: stat.map((s) => format(s.day, 'dd.MM.yyyy')),
      link: link.domain,
      totalClicks: stat.reduce((acc, s) => acc + s.clicks, 0),
    };
  }
}
