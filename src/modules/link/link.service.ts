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

  async makeId(domain: string, length = 7): Promise<string> {
    let id = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const link = await this.repo.findOne({ domain, slug: id });
    if (!link) {
      return id;
    } else {
      return this.makeId(domain, length);
    }
  }

  async createLink(data: {
    slug?: string;
    domain: string;
    url: string;
    length?: number;
  }): Promise<LinkEntity> {
    const { domain, url, length } = data;
    let { slug } = data;
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
    } else {
      slug = await this.makeId(domain, length);
    }
    const link = await this.repo.save({
      domain,
      url,
      slug,
    });
    return link;
  }
}
