import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiGuard } from 'src/guards';
import { LinkEntity } from '../link/entities';
import { ApiService } from './api.service';
import { CreateRequestDto } from './dto';
import { GetStatParamDto } from './dto/get-stat-param.dto';
import { StatResponseDto } from './dto/stat-response.dto';

@UseGuards(ApiGuard)
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/stat/:domain/:slug/:granularity')
  async getStat(@Param() params: GetStatParamDto): Promise<StatResponseDto> {
    return await this.apiService.getHistory(params);
  }
}
