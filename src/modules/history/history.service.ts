import { Injectable } from '@nestjs/common';
import * as isbot from 'isbot';
import { URL } from 'url';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILink } from '../link/interfaces';
import { LinkService } from '../link/link.service';
import { HistoryEntity } from './entities';
import { EGranularity } from '../api/enum';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly repo: Repository<HistoryEntity>,
    private readonly linkService: LinkService,
  ) {}

  async trackHistory(link: ILink, url: string, userAgent?: string) {
    if (!userAgent) {
      return;
    }
    const isBot = isbot(userAgent);
    if (isBot) {
      return;
    }

    await this.repo.insert({
      linkId: link.id,
      query: this.getQueryParams(url),
      userAgent,
    });
  }

  getQueryParams(url: string): Record<string, string> {
    const response = {};
    const parsedUrl = new URL(url);
    const keys = parsedUrl.searchParams.keys();
    let key = keys.next();
    while (!key.done) {
      const value = parsedUrl.searchParams.get(key.value);
      if (value) {
        response[key.value] = value;
      }
      key = keys.next();
    }
    return response;
  }

  async getHistory(
    link: ILink,
    granularity: EGranularity,
  ): Promise<
    Array<{
      day: Date;
      clicks: number;
    }>
  > {
    const history = await this.repo
      .createQueryBuilder('history')
      .select('COUNT(*)', 'clicks')
      .addSelect(
        `DATE_TRUNC('${granularity}', DATE(history."createdAt"))`,
        'day',
      )
      .groupBy('2')
      .where({
        linkId: link.id,
      })
      .getRawMany();
    return history.map((h) => ({
      ...h,
      clicks: parseInt(h.clicks),
    }));
  }
}
