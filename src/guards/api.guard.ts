import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AppConfigService } from 'src/modules/app-config/app-config.service';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private config: AppConfigService) {}
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const apiKey = this.config.get('common').apiKey;
    if (!apiKey) {
      return false;
    }
    return req.headers.authorization === apiKey;
  }
}
