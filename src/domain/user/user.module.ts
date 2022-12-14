import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Users, UsersSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository';
import { MongoErrorHandler } from '../../database/handlers/mongo-error-handler';
import {
  UsersVerifications,
  UsersVerificationsSchema,
} from './schema/users-verification.schema';
import { UserVerificationsRepository } from './repository/user-verification.repository';

import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';
import {
  Countries,
  CountriesSchema,
} from '../countries/schemas/countries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Countries.name, schema: CountriesSchema },
      { name: UsersVerifications.name, schema: UsersVerificationsSchema },
    ]),
  ],
  providers: [
    UserService,
    UserRepository,
    UserVerificationsRepository,
    MongoErrorHandler,
    EcommerceGlobalConfig,
  ],
  exports: [MongooseModule],
  controllers: [UserController],
})
export class UserModule {}
