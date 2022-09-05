import { NextFunction, Request, Response } from 'express';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { createContextWinston } from '../../utils/logger';
import * as requestIp from '@supercharge/request-ip';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';

export enum TypeAuthorization {
  BEARER = 'Bearer',
}

@Injectable()
export class IpAddressVerifyMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly _ecommerceGlobalConfig: EcommerceGlobalConfig,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const context = createContextWinston(this.constructor.name, this.use.name);
    let ip = requestIp.getClientIp(req);
    if (this._ecommerceGlobalConfig.environmentDevStatus.mode === 'debug') {
      ip = this._ecommerceGlobalConfig.geoLocationConfig.ipDevelop;
    }
    req.headers['ip-address'] = ip;
    this.logger.debug(`Ip remote user is ${ip}`, {
      ...context,
    });

    return next();
  }
}
