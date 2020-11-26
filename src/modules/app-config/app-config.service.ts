import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/configuration';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get<K extends keyof AppConfigType>(key: K): AppConfigType[K] {
    const config = this.configService.get(key);
    return config;
  }
}
