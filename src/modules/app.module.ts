import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig, logginConfig } from 'src/configuration';
import { HistoryModule } from './history/history.module';
import { LinkModule } from './link/link.module';
import { AppConfigModule } from './app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './app-config/app-config.service';
import { ApiModule } from './api/api.module';
import * as winston from 'winston';
import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
import { FrontendModule } from './frontend/frontend.module';
import { commonConfig } from 'src/configuration/common.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, logginConfig, commonConfig],
    }),
    AppConfigModule,
    WinstonModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        transports: [
          config.get('logging').stackdriver ? new LoggingWinston() : undefined,
          config.get('logging').console
            ? new winston.transports.Console({
                format: winston.format.combine(
                  nestWinstonUtilities.format.nestLike(),
                ),
              })
            : undefined,
        ].filter(Boolean) as any,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        type: 'postgres',
        username: config.get('db').user,
        password: config.get('db').password,
        host: config.get('db').host,
        database: config.get('db').database,
        port: config.get('db').port,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    LinkModule,
    HistoryModule,
    ConfigModule,
    ApiModule,
    FrontendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
