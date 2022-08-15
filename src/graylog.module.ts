import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GRAYLOG_CONFIGURATION } from './constants';
import { Options, OptionsAsync } from './interfaces';

@Module({})
export class GraylogModule {
  public static register(config: Options): DynamicModule {
    return {
      module: GraylogModule,
      providers: [
        {
          provide: GRAYLOG_CONFIGURATION,
          useValue: config,
        },
      ],
      exports: [GRAYLOG_CONFIGURATION],
    };
  }

  public static async registerAsync(
    config: OptionsAsync,
  ): Promise<DynamicModule> {
    return {
      module: GraylogModule,
      imports: config.imports || [],
      providers: [this.createAsyncProviders(config)],
      exports: [GRAYLOG_CONFIGURATION],
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
