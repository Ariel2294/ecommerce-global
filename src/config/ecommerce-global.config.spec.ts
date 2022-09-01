import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockEnv } from '../__mocks__/ecommerce-global.mock';
import { EcommerceGlobalConfig } from './ecommerce-global.config';

describe('CustomerServiceConfig', () => {
  let config: EcommerceGlobalConfig;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [() => mockEnv],
          ignoreEnvFile: false,
        }),
      ],
      providers: [EcommerceGlobalConfig],
    }).compile();
    config = moduleRef.get(EcommerceGlobalConfig);
  });

  test('should be defined', () => {
    expect(config).toBeDefined();
  });
});
