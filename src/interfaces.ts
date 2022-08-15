import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export type Options = {
  servers: { host: string; port: number }[];
  hostname?: string;
  facility?: string;
  bufferSize?: number;
  deflate?: string;
};

export type OptionsAsync = {
  useFactory: (...args: any[]) => Options | Promise<Options>;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;
