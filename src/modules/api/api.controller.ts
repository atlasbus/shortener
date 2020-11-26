import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LinkEntity } from '../link/entities';
import { ApiService } from './api.service';
import { CreateRequestDto } from './dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  @Post()
  async create(@Body() body: CreateRequestDto): Promise<LinkEntity> {
    return await this.apiService.createLink(body);
  }

  @Get('/:domain/:slug')
  async getLink(
    @Param('domain') domain: string,
    @Param('slug') slug: string,
  ): Promise<LinkEntity> {
    return await this.apiService.getLink(domain, slug);
  }
}
