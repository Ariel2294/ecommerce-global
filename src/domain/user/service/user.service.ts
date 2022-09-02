import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { encryptionPassword } from '../../../utils/encryption';
import { Logger } from 'winston';
import { createContextWinston } from '../../../utils/logger';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { userDataResponse } from '../util/user.util';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _mongoErrorHandler: MongoErrorHandler,
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

      return userDataResponse(userCreated);
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.create.name);
    }
  }

  getAll() {
    return this._userRepository.find({});
  }
}
