import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcommerceGlobalModule } from './config/ecommerce-global.module';
import { EcommerceGlobalServiceValidateConfig } from './config/ecommerce-global.validate.config';

@Module({
  imports: [
    EcommerceGlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: EcommerceGlobalServiceValidateConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
