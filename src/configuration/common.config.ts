import { registerAs } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';

export enum EEnvironment {
  Production = 'produciton',
  Development = 'development',
}

export type CommonConfigType = {
  environment: EEnvironment;
  apiKey?: string;
};

export const commonConfig = registerAs<ConfigFactory<CommonConfigType>>(
  'common',
  () => ({
    environment: (process.env.NODE_ENV as any) || 'development',
    apiKey: process.env.API_KEY,
  }),
);
