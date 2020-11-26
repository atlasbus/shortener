import { registerAs } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';

export type DBConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
};

export const dbConfig = registerAs<ConfigFactory<DBConfig>>('db', () => ({
  host: process.env.POSTGRES_HOST || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
}));
