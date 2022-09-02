import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcommerceGlobalConfig } from './config/ecommerce-global.config';
import { EcommerceGlobalModule } from './config/ecommerce-global.module';
import { EcommerceGlobalServiceValidateConfig } from './config/ecommerce-global.validate.config';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { loggerOptions } from './utils/logger';

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
    AuthModule,
    UserModule,
    WinstonModule.forRoot(loggerOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
