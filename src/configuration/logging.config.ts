import { registerAs } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';

export type LoggingConfigType = {
  stackdriver: boolean;
  console: boolean;
};

export const logginConfig = registerAs<ConfigFactory<LoggingConfigType>>(
  'logging',
  () => ({
    stackdriver: !!process.env.STACKDRIVER,
    console: !!process.env.CONSOLE,
  }),
);
