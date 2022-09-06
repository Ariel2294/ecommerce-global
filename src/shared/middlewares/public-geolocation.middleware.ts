import { NextFunction, Request, Response } from 'express';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { createContextWinston } from '../../utils/logger';
import { GeolocationService } from '../../domain/geolocation/service/geolocation.service';
export enum TypeAuthorization {
  BEARER = 'Bearer',
}

@Injectable()
export class PublicGeoLocationMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly _geolocationService: GeolocationService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('authorization');
    const context = createContextWinston(this.constructor.name, this.use.name);
    if (!authorization) {
      this.logger.info('Get public access geolocation without authorization', {
        ...context,
      });
      await this._updateGeolocation(req);
      return next();
    }
    const headerSplit = authorization?.split(' ');
    if (Array.isArray(headerSplit)) {
      if (headerSplit[0] !== TypeAuthorization.BEARER) {
        this.logger.info(
          'Get public access geolocation with other authorization type',
          {
            ...context,
          },
        );
        await this._updateGeolocation(req);
        return next();
      }
    }
    return next();
  }

  async _updateGeolocation(req: Request) {
    const context = createContextWinston(
      this.constructor.name,
      this._updateGeolocation.name,
    );
    const ip = req.headers['ip-address'];
    this.logger.info('Get public access geolocation', { ...context });
    const geolocation = await this._geolocationService.getLocation(
      String(ip),
      null,
    );

    req.headers['geo-location'] = JSON.stringify(geolocation);
  }
}
