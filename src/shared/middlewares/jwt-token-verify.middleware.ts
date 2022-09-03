import { NextFunction, Request, Response } from 'express';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { createContextWinston } from '../../utils/logger';
import { JwtService } from '@nestjs/jwt';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';
import { EncrytionAuth } from '../../domain/auth/utils/encryption-auth.util';
export enum TypeAuthorization {
  BEARER = 'Bearer',
}

@Injectable()
export class JwtTokenVerifyMiddleware implements NestMiddleware {
  constructor(
    private readonly _configService: EcommerceGlobalConfig,
    private readonly _jwtService: JwtService,
    private readonly _encrytionAuth: EncrytionAuth,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (this._configService.environmentDevStatus.nodeEnv !== 'develop') {
      const context = createContextWinston(
        this.constructor.name,
        this.use.name,
      );
      const authorization = req.header('authorization');
      if (!authorization) {
        this.logger.warn('unauthorized', { ...context });
        throw new ForbiddenException('Unauthorized');
      }

      const [type, code] = authorization.split(' ');

      if (type === TypeAuthorization.BEARER) {
        this.logger.debug('Verify static token', { ...context });
        const token = this._encrytionAuth.decrypt(code);
        if (
          this._jwtService.verify(token, {
            ignoreExpiration: false,
            secret: this._configService.authConfig.jwtSecret,
          })
        ) {
          return next();
        }
      }
      return next(new UnauthorizedException('Invalid Token'));
    }
    return next();
  }
}
