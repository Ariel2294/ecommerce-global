import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcommerceGlobalConfig } from './config/ecommerce-global.config';
import { EcommerceGlobalModule } from './config/ecommerce-global.module';
import { EcommerceGlobalServiceValidateConfig } from './config/ecommerce-global.validate.config';

@Module({
  imports: [
    EcommerceGlobalModule,
    MongooseModule.forRootAsync({
      imports: [EcommerceGlobalModule],
      useFactory: async (configService: EcommerceGlobalConfig) => ({
        uri: configService.databaseURL,
      }),
      inject: [EcommerceGlobalConfig],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: EcommerceGlobalServiceValidateConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
