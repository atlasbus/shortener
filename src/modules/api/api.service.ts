import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { LinkEntity } from '../link/entities';
import { LinkService } from '../link/link.service';
import { CreateRequestDto } from './dto';

@Injectable()
export class ApiService {
  constructor(private readonly linkService: LinkService) {}

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
}
