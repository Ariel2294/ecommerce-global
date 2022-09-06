import { CacheModule, Module } from '@nestjs/common';
import { GeolocationService } from './service/geolocation.service';
import { EcommerceGlobalModule } from '../../config/ecommerce-global.module';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';
import * as redisStore from 'cache-manager-redis-store';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [GeolocationService, EcommerceGlobalConfig],
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      imports: [EcommerceGlobalModule],
      useFactory: async (configService: EcommerceGlobalConfig) => ({
        store: redisStore,
        url: configService.redisConfig.url,
        ttl: configService.redisConfig.ttl,
      }),
      inject: [EcommerceGlobalConfig],
    }),
  ],
  exports: [HttpModule, CacheModule],
})
export class GeolocationModule {}
