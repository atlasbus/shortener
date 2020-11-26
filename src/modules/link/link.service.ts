import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkEntity } from './entities';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity) private readonly repo: Repository<LinkEntity>,
  ) {}

  async getLink(domain: string, slug: string): Promise<LinkEntity> {
    return await this.repo.findOneOrFail({ domain, slug });
  }

  async createLink(data: {
    slug?: string;
    domain: string;
    url: string;
  }): Promise<LinkEntity> {
    const { slug, domain, url } = data;
    if (slug) {
      const existedLink = await this.repo.findOne({
        domain,
        slug,
      });
      if (existedLink) {
        throw new ConflictException({
          url,
        });
      }
    }
    const link = await this.repo.save({
      domain,
      url,
      slug,
    });
    return link;
  }
}
