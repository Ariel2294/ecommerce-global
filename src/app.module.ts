import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcommerceGlobalConfig } from './config/ecommerce-global.config';
import { EcommerceGlobalModule } from './config/ecommerce-global.module';
import { EcommerceGlobalServiceValidateConfig } from './config/ecommerce-global.validate.config';
import { AuthModule } from './domain/auth/auth.module';
import { EncrytionAuth } from './domain/auth/utils/encryption-auth.util';
import { UserModule } from './domain/user/user.module';
import { IpAddressVerifyMiddleware } from './shared/middlewares/ip-verify.middleware';
import { JwtTokenVerifyMiddleware } from './shared/middlewares/jwt-token-verify.middleware';
import { loggerOptions } from './utils/logger';
import { GeolocationModule } from './domain/geolocation/geolocation.module';
import { GeolocationService } from './domain/geolocation/service/geolocation.service';
import { CountriesModule } from './domain/countries/countries.module';
import { ProductsModule } from './domain/products/products.module';
import { PublicGeoLocationMiddleware } from './shared/middlewares/public-geolocation.middleware';

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
    GeolocationModule,
    CountriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncrytionAuth, GeolocationService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpAddressVerifyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(JwtTokenVerifyMiddleware)
      .exclude(
        {
          path: '(.*)/auth/login',
          method: RequestMethod.POST,
        },
        { path: '(.*)/auth/register', method: RequestMethod.POST },
        { path: '(.*)/auth/verify-account/:token', method: RequestMethod.GET },
        { path: '(.*)/countries', method: RequestMethod.GET },
        { path: '(.*)/cities', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(PublicGeoLocationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
