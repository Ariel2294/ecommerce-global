import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EcommerceGlobalConfig } from './ecommerce-global.config';

@Module({
  imports: [ConfigModule],
  providers: [ConfigService, EcommerceGlobalConfig],
  exports: [EcommerceGlobalConfig],
})
export class EcommerceGlobalModule {}
