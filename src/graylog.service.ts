import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { GRAYLOG_CONFIGURATION } from './constants';
import { Options } from './interfaces';
import * as graylog2 from 'graylog2';

@Injectable()
export class GraylogService implements OnApplicationShutdown {
  private readonly graylog: typeof graylog2;

  constructor(@Inject(GRAYLOG_CONFIGURATION) private config: Options) {
    this.graylog = new graylog2.graylog(config);
  }

  async emergency(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.emergency(message, null, additionalFields);
  }

  async alert(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.alert(message, null, additionalFields);
  }

  async critical(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.critical(message, null, additionalFields);
  }

  async error(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.error(message, null, additionalFields);
  }

  async warning(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.warning(message, null, additionalFields);
  }

  async notice(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.notice(message, null, additionalFields);
  }

  async info(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.info(message, null, additionalFields);
  }

  async debug(
    message: string,
    additionalFields?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.debug(message, null, additionalFields);
  }

  getClient(): typeof graylog2 {
    return this.graylog;
  }

  async onApplicationShutdown(): Promise<void> {
    await this.graylog.close();
  }
}
