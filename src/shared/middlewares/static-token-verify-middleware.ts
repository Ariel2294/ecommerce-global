import { NextFunction, Request, Response } from 'express';
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { createContextWinston } from '../../utils/logger';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';

export enum TypeAuthorization {
  STATIC = 'Static',
}

@Injectable()
export class StaticTokenVerifyMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: EcommerceGlobalConfig,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const context = createContextWinston(this.constructor.name, this.use.name);
    const authorization = req.header('ApiKey');
    if (!authorization) {
      this.logger.warn('unauthorized', { ...context });
      throw new UnauthorizedException('Unauthorized');
    }

    const [type, code] = authorization.split(' ');

    if (type === TypeAuthorization.STATIC) {
      this.logger.debug('Verify static token', { ...context });
      if (code === this.configService.tokenConfig.token) {
        return next();
      }
    }
    return next(new UnauthorizedException('Invalid Token'));
  }
}
