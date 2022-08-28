import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GRAYLOG_CONFIGURATION } from './constants';
import { GraylogService } from './graylog.service';
import { Options } from './interfaces';

const configService = new ConfigService(dotenv.config());

describe('GraylogService', () => {
  let service: GraylogService;
  let host: string;
  let port: number;

  beforeEach(async () => {
    host = configService.get<string>('GRAYLOG_HOST');
    port = +configService.get<number>('GRAYLOG_PORT');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GRAYLOG_CONFIGURATION,
          useValue: {
            servers: [{ host, port }],
          } as Options,
        },
        GraylogService,
      ],
    }).compile();

    service = module.get<GraylogService>(GraylogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('log emergency', async () => {
    jest.spyOn(service, 'emergency').mockReturnValue(undefined);
    const logged = await service.emergency('test');

    expect(logged).toBeUndefined();
  });

  it('call getClient should be object', async () => {
    const client = await service.getClient();

    expect(typeof client === 'object').toBeTruthy();
  });
});
