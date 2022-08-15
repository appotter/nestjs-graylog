import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GRAYLOG_CONFIGURATION } from './constants';
import { GraylogService } from './graylog.service';
import { Options } from './interfaces';

const configService = new ConfigService(dotenv.config());

describe('GraylogService', () => {
  let service: GraylogService;
  let fakeService: Partial<GraylogService>;
  let host: string;
  let port: number;

  beforeAll(async () => {
    host = configService.get<string>('GRAYLOG_HOST');
    port = +configService.get<number>('GRAYLOG_PORT');

    fakeService = {
      emergency: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GRAYLOG_CONFIGURATION,
          useValue: {
            servers: [{ host, port }],
          } as Options,
        },
        {
          provide: GraylogService,
          useValue: fakeService,
        },
      ],
    }).compile();

    service = module.get<GraylogService>(GraylogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('log emergency', async () => {
    const logged = await service.emergency('test');

    expect(logged).toBeUndefined();
  });
});
