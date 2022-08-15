<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS Graylog</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of [Graylog2](https://github.com/Wizcorp/node-graylog2) client library for NestJS.

### Installation

```bash
npm install --save nestjs-graylog graylog2
```

### Usage

#### Importing module

```typescript
import { GraylogModule, GraylogService } from 'nestjs-graylog';

@Module({
  imports: [
    GraylogModule.register({
      serviers: [
        { host: '127.0.0.1', port: 12201 }
      ],
      hostname: 'hostname',// optional, default: os.hostname()
      facility: 'Node.js',// optional, default: Node.js
      bufferSize: 1400,// optional, default: 1400
    }),
  ],
  providers: [GraylogService],
  exports: [GraylogService],
})
export class GraylogProviderModule {}
```

#### Importing module Async

```typescript
import { GraylogModule, GraylogService } from 'nestjs-graylog';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GraylogModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        servers: [
          {
            host: configService.get('GRAYLOG_HOST'),
            port: +configService.get('GRAYLOG_PORT'),
          },
        ],
        facility: configService.get('GRAYLOG_FACILITY'),
      }),
    }),
  ],
  providers: [GraylogService],
  exports: [GraylogService],
})
export class GraylogProviderModule {}
```
#### Calling Method

```typescript
import { GraylogService } from 'nestjs-graylog';

@Injectable()
export class YourService {
  constructor(private graylogService: GraylogService) {}

  async foo() {
    await this.graylogService.debug('test message', { foo: 'bar' });
  }

  // Also available in
  // this.graylogService.emergency('message')
  // this.graylogService.alert('message')
  // this.graylogService.critical('message')
  // this.graylogService.error('message')
  // this.graylogService.warning('message')
  // this.graylogService.notice('message')
  // this.graylogService.info('message')
}
```

## Contributing

Contributions welcome!

## Author
**Phitsanu Chuamuangphan ([GitHub](https://github.com/appotter))**

## LICENSE

MIT
