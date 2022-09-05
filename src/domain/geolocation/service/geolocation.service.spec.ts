import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  currencyDataMock,
  geolocationDataMock,
} from '../../../__mocks__/geolocation.mock';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';
import { mockEnv } from '../../../__mocks__/ecommerce-global.mock';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeolocationService, EcommerceGlobalConfig],
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          load: [() => mockEnv],
          ignoreEnvFile: false,
        }),
        CacheModule.register(),
      ],
    }).compile();

    service = module.get<GeolocationService>(GeolocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get geolocation', () => {
    it('should get geolocation', async () => {
      service.getCurrencyRate = jest.fn().mockReturnValueOnce(currencyDataMock);
      service._setCacheGeolocation = jest
        .fn()
        .mockReturnValueOnce(geolocationDataMock.geolocationData);
      const result = await service.getLocation(
        '169.57.37.1',
        '631553c48f77ce4f70f620bb',
      );

      expect(result).toMatchObject(geolocationDataMock);
    });
  });

  describe('get currency', () => {
    it('should get currency', async () => {
      service._setCacheCurrency = jest
        .fn()
        .mockReturnValueOnce(geolocationDataMock.currencyData);
      const result = await service.getCurrencyRate('USD');

      expect(result).toMatchObject(geolocationDataMock.currencyData);
    });
  });
});
