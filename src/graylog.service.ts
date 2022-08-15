import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { GRAYLOG_CONFIGURATION } from './constants';
import { Options } from './interfaces';
const graylog2 = require('graylog2');

@Injectable()
export class GraylogService implements OnApplicationShutdown {
  private readonly graylog: Record<string, any>;

  constructor(@Inject(GRAYLOG_CONFIGURATION) private config: Options) {
    this.graylog = new graylog2.graylog(config);
  }

  async emergency(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.emergency(message, null, additionals);
  }

  async alert(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.alert(message, null, additionals);
  }

  async critical(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.critical(message, null, additionals);
  }

  async error(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.error(message, null, additionals);
  }

  async warning(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.warning(message, null, additionals);
  }

  async notice(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.notice(message, null, additionals);
  }

  async info(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.info(message, null, additionals);
  }

  async debug(
    message: string,
    additionals?: Record<string, any>,
  ): Promise<void> {
    await this.graylog.debug(message, null, additionals);
  }

  async onApplicationShutdown(): Promise<void> {
    await this.graylog.close();
  }
}
