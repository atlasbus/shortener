import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from 'src/configuration';
import { HistoryModule } from './history/history.module';
import { LinkModule } from './link/link.module';
import { AppConfigModule } from './app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './app-config/app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    AppConfigModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
