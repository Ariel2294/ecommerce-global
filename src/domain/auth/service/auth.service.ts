import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userVerificationsRepository: UserVerificationsRepository,
    private readonly _encrytionAuth: EncrytionAuth,
    private readonly _mongoErrorHandler: MongoErrorHandler,
    private readonly _jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async login(credentials: AuthLoginDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.login.name,
    );
    let user;
    let isMatch = false;

    try {
      this.logger.debug('Attempting  login user', {
        ...context,
      });

      user = await this._userRepository.findOne(
        {
          email: credentials.email,
        },
        'first_name last_name +password',
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
    return this._loginJwtReponse(user);
  }

  _loginJwtReponse(user) {
    const payload = {
      username: user.email,
      sub: user._id,
    };
    return {
      access_token: this._encrytionAuth.encrypt(this._jwtService.sign(payload)),
    };
  }
}
