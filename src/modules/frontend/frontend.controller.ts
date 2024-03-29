import {
  ConflictException,
  Controller,
  Get,
  HostParam,
  Inject,
  LoggerService,
  Param,
  Redirect,
  Headers,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { config } from 'rxjs';
import { EEnvironment } from 'src/configuration/common.config';
import { AppConfigService } from '../app-config/app-config.service';
import { HistoryService } from '../history/history.service';
import { LinkService } from '../link/link.service';

@Controller()
export class FrontendController {
  constructor(
    private linkService: LinkService,
    private historyService: HistoryService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly config: AppConfigService,
  ) {}

  @Redirect('https://atlasbus.ru')
  @Get()
  async default() {}

  @Redirect('https://atlasbus.ru')
  @Get('/:slug')
  async get(
    @Param('slug') slug: string,
    @HostParam() host: string,
    @Headers() headers: Record<string, string | undefined>,
    @Req() req: Request,
  ) {
    if (this.config.get('common').environment !== EEnvironment.Production) {
      host = 'atls.cc';
    }
    if (headers['x-real-host']) {
      host = headers['x-real-host'];
    }
    try {
      const link = await this.linkService.getLink(host, slug);
      const originalUrl = `https://${host}${req.url}`;

      const linkUrl =
        link.url.startsWith('http://') || link.url.startsWith('https://')
          ? link.url
          : `http://${link.url}`;

      await this.historyService.trackHistory(
        link,
        originalUrl,
        headers['user-agent'],
      );
      return {
        url: linkUrl,
        statusCode: 302,
      };
    } catch (e) {
      if (!(e instanceof ConflictException)) {
        this.logger.error(e);
      }
    }
  }
}
