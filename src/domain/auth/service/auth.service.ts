import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { Logger } from 'winston';
import { UserVerificationsRepository } from '../../user/repository/user-verification.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthLoginDto } from '../dto/auth.dto';
import { createContextWinston } from '../../../utils/logger';
import { passwordValidation } from '../../../utils/encryption';
import { EncrytionAuth } from '../utils/encryption-auth.util';
import { JwtService } from '@nestjs/jwt';
import { getCurrentTime } from '../../../utils';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';
import { validationExpireTokenVerify } from '../utils/auth.utils';
import { UsersVerifications } from '../../user/schema/users-verification.schema';
import { GeolocationService } from '../../geolocation/service/geolocation.service';
import { GeolocationInterface } from '../../geolocation/interfaces/geolocation.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userVerificationsRepository: UserVerificationsRepository,
    private readonly _encrytionAuth: EncrytionAuth,
    private readonly _mongoErrorHandler: MongoErrorHandler,
    private readonly _jwtService: JwtService,
    private readonly _geolocationService: GeolocationService,

    private readonly _ecommerceGlobalConfig: EcommerceGlobalConfig,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async login(credentials: AuthLoginDto, ip: string) {
    const context = createContextWinston(
      this.constructor.name,
      this.login.name,
    );
    let user;
    let isMatch = false;

    try {
      this.logger.debug('Attempting  login user', {
        ...context,
        ipAddress: ip,
      });

      user = await this._userRepository.findOne(
        {
          email: credentials.email,
        },
        'first_name last_name verifyAccount +password',
      );

      if (user?.password) {
        isMatch = await passwordValidation(credentials.password, user.password);
      }
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.login.name);
    }

    if (!user || !isMatch) {
      throw new UnauthorizedException('Email or password are incorrect');
    }
    const geoLocation = await this._geolocationService.getLocation(
      ip,
      user._id,
    );

    return this._loginJwtReponse(user, geoLocation.geolocationData);
  }

  _loginJwtReponse(user, geoLocation: GeolocationInterface) {
    const payload = {
      username: user.email,
      userId: user._id,
    };
    return {
      access_token: this._encrytionAuth.encrypt(this._jwtService.sign(payload)),
      verifyAccount: user.verifyAccount,
      country: geoLocation.country.name,
      flag: geoLocation.country.flag.file,
      timeZone: geoLocation.time.timezone,
    };
  }

  async verifyAccount(token: string) {
    const context = createContextWinston(
      this.constructor.name,
      this.verifyAccount.name,
    );

    let verificationData;
    let expired;
    try {
      this.logger.debug('Attempting  get verify data', {
        ...context,
      });

      verificationData = await this._userVerificationsRepository.findOne({
        token,
      });

      expired = validationExpireTokenVerify(
        this._ecommerceGlobalConfig.defaultTimeZone,
        verificationData.token_expiration_date,
      );
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(
        error,
        this.verifyAccount.name,
      );
    }

    if (!verificationData.is_valid) {
      throw new BadRequestException('token was already used');
    }
    return await this._expiredValidation(expired, token, verificationData);
  }

  async _expiredValidation(
    expired: boolean,
    token: string,
    verificationData: UsersVerifications,
  ) {
    const context = createContextWinston(
      this.constructor.name,
      this._expiredValidation.name,
    );
    if (expired) {
      try {
        this.logger.debug(
          'Attempting  update verify record then token is expired',
          {
            ...context,
          },
        );

        await this._userVerificationsRepository.findOneAndUpdate(
          {
            token,
          },
          { is_valid: false },
        );
      } catch (error) {
        this._mongoErrorHandler.handleMongooseErrors(
          error,
          this.verifyAccount.name,
        );
      }
      this.logger.warn(`Token for user ${verificationData.user} has expired`, {
        ...context,
      });
      throw new BadRequestException('token has expired');
    }

    try {
      await this._userVerificationsRepository.findOneAndUpdate(
        {
          token,
        },
        {
          is_valid: false,
          verfication_date: getCurrentTime(
            this._ecommerceGlobalConfig.defaultTimeZone,
          ),
        },
      );

      await this._userRepository.findOneAndUpdate(
        {
          _id: verificationData.user,
        },
        { verifyAccount: true },
      );

      return {
        message: 'Account validated successfully',
      };
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(
        error,
        this.verifyAccount.name,
      );
    }
  }
}
