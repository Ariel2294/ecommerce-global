import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repository/user.repository';
import { UserVerificationsRepository } from '../user/repository/user-verification.repository';
import { MongoErrorHandler } from '../../database/handlers/mongo-error-handler';
import { EncrytionAuth } from './utils/encryption-auth.util';
import { JwtModule } from '@nestjs/jwt';
import { EcommerceGlobalModule } from '../../config/ecommerce-global.module';
import { UserService } from '../user/service/user.service';
import { GeolocationService } from '../geolocation/service/geolocation.service';
import { GeolocationModule } from '../geolocation/geolocation.module';

@Module({
  providers: [
    AuthService,
    EcommerceGlobalConfig,
    UserRepository,
    UserVerificationsRepository,
    MongoErrorHandler,
    EncrytionAuth,
    UserService,
    GeolocationService,
  ],
  controllers: [AuthController],
  imports: [
    GeolocationModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [EcommerceGlobalConfig],
      imports: [EcommerceGlobalModule],
      useFactory: async (configService: EcommerceGlobalConfig) => {
        return {
          secret: configService.authConfig.jwtSecret,
          signOptions: {
            expiresIn: '30d',
          },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
