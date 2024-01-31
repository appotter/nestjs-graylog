import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GRAYLOG_CONFIGURATION } from './constants';
import { GraylogService } from './graylog.service';
import { Options } from './interfaces';

const configService = new ConfigService(dotenv.config());

const fakeGraylogInstance = {
  graylog: jest.fn(),
  emergency: jest.fn(),
  alert: jest.fn(),
  critical: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  notice: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  close: jest.fn(),
};

jest.mock(
  'graylog2',
  () => ({
    graylog: jest.fn().mockImplementation(() => fakeGraylogInstance),
  }),
  { virtual: true },
);

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

  it('should log emergency', async () => {
    await service.emergency('test');

    expect(fakeGraylogInstance.emergency).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('should call alert with the provided message and additional fields', async () => {
    const message = 'Test message';
    const additionalFields = { key: 'value' };

    await service.alert(message, additionalFields);

    expect(fakeGraylogInstance.alert).toHaveBeenCalledWith(
      message,
      null,
      additionalFields,
    );
  });

  it('should log critical', async () => {
    await service.critical('test');

    expect(fakeGraylogInstance.critical).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('should log error', async () => {
    await service.error('test');

    expect(fakeGraylogInstance.error).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('should log warning', async () => {
    await service.warning('test');

    expect(fakeGraylogInstance.warning).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('should log notice', async () => {
    await service.notice('test');

    expect(fakeGraylogInstance.notice).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('should log info', async () => {
    await service.info('test');

    expect(fakeGraylogInstance.info).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('should log debug', async () => {
    await service.debug('test');

    expect(fakeGraylogInstance.debug).toHaveBeenCalledWith(
      'test',
      null,
      undefined,
    );
  });

  it('call getClient should be object', async () => {
    const client = await service.getClient();

    expect(typeof client === 'object').toBeTruthy();
  });

  it('should call graylog.close on application shutdown', async () => {
    await service.onApplicationShutdown();

    expect(fakeGraylogInstance.close).toHaveBeenCalled();
  });
});
