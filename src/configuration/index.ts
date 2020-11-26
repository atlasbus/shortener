import { CommonConfigType } from './common.config';
import { DBConfig } from './db.config';
import { LoggingConfigType } from './logging.config';

export * from './db.config';
export * from './logging.config';

export type AppConfigType = {
  db: DBConfig;
  logging: LoggingConfigType;
  common: CommonConfigType;
};
