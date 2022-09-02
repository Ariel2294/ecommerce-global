import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createContextWinston } from '../../utils/logger';

@Injectable()
export class MongoErrorHandler {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  handleMongooseErrors(error, functionName = '') {
    const context = createContextWinston(
      this.constructor.name,
      functionName ? functionName : this.handleMongooseErrors.name,
    );

    switch (error?.code) {
      case 11000:
        this.logger.error('Mongodb known error', {
          message: error.message,
          keys: error?.keyPattern,
          value: error?.keyValue,
          ...context,
        });

        throw new BadRequestException({
          message: 'DuplicateKey',
          keys: Object.keys(error?.keyPattern),
          value: error?.keyValue,
        });
        break;

      default:
        break;
    }
  }
}
