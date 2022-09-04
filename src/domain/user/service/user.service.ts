import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { encryptionPassword } from '../../../utils/encryption';
import { Logger } from 'winston';
import { createContextWinston } from '../../../utils/logger';
import { UserDto, UserFilterDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import {
  getUserParams,
  userCreateDataResponse,
  userFindDataResponse,
} from '../util/user.util';
import { UserVerificationsRepository } from '../repository/user-verification.repository';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { userFindQueryOptions } from '../util/mongoose.user.util';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userVerificationsRepository: UserVerificationsRepository,
    private readonly _mongoErrorHandler: MongoErrorHandler,
    private readonly _ecommerceGlobalConfig: EcommerceGlobalConfig,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(user: UserDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.create.name,
    );

    const passorEncrypt: string = await encryptionPassword(user.password);
    try {
      this.logger.debug('Attempting  to create a user', {
        ...context,
      });

      const userCreated = await this._userRepository.create({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: passorEncrypt,
        preferred_currency: user.preferred_currency,
        country: user.country,
      });

      await this._createValidationToken(userCreated._id);

      return userCreateDataResponse(userCreated);
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.create.name);
    }
  }

  async getAll(filter: UserFilterDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.getAll.name,
    );
    const userQueryParams = getUserParams(filter);
    const userQueryOption = userFindQueryOptions(filter);
    try {
      this.logger.debug('Attempting  to get user records', {
        ...context,
      });

      const users = await this._userRepository.find(
        userQueryParams,
        userQueryOption,
      );
      const count = await this._userRepository.count();
      return userFindDataResponse(filter, users, count);
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.getAll.name);
    }
  }

  _createValidationToken(userId: string) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return this._userVerificationsRepository.create({
      user: userId,
      token_expiration_date: dayjs()
        .tz(this._ecommerceGlobalConfig.defaultTimeZone)
        .add(15, 'minutes'),
    });
  }
}
