import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GRAYLOG_CONFIGURATION } from './constants';
import { GraylogService } from './graylog.service';
import { Options, OptionsAsync } from './interfaces';

@Module({})
export class GraylogModule {
  public static register(config?: Options): DynamicModule {
    if (config.servers === undefined) {
      config = { servers: [{ host: '127.0.0.1', port: 12201 }] };
    }

    return {
      module: GraylogModule,
      providers: [
        {
          provide: GRAYLOG_CONFIGURATION,
          useValue: config,
        },
        GraylogService,
      ],
      exports: [GRAYLOG_CONFIGURATION, GraylogService],
    };
  }

  public static async registerAsync(
    config: OptionsAsync,
  ): Promise<DynamicModule> {
    return {
      module: GraylogModule,
      imports: config.imports || [],
      providers: [this.createAsyncProviders(config), GraylogService],
      exports: [GRAYLOG_CONFIGURATION, GraylogService],
    };
  }

  private static createAsyncProviders(options: OptionsAsync): Provider {
    return {
      provide: GRAYLOG_CONFIGURATION,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
