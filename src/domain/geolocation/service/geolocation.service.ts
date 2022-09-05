import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';
import { Cache } from 'cache-manager';
import { HttpRequest } from '../../../utils/http-request';
import { getDateAdded, getTimeExpiredCurrencies } from '../../../utils';
import {
  CurrencyInterface,
  GeolocationInterface,
} from '../interfaces/geolocation.interface';

@Injectable()
export class GeolocationService {
  cacheGeoLocationKeyString = 'GEOLOCATION-CACHE';
  cacheCurrencyKeyString = 'CURRENCY-CACHE';

  baseUrl = this._ecommerceGlobalConfig.geoLocationConfig.baseUrlGeoApi;
  api_key = this._ecommerceGlobalConfig.geoLocationConfig.tokenGeoApi;
  geoExpired = this._ecommerceGlobalConfig.redisConfig.hoursGeoExpired;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _ecommerceGlobalConfig: EcommerceGlobalConfig,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getLocation(ip: string, userId: string) {
    const key = `${this.cacheGeoLocationKeyString}-${userId}`;
    let valueCache: GeolocationInterface = await this.cacheManager.get(key);
    if (!valueCache) {
      valueCache = await this._setCacheGeolocation(key, ip);
    }
    if (ip !== valueCache.ip) {
      valueCache = await this._setCacheGeolocation(key, ip);
    }

    const currencyData = await this.getCurrencyRate(valueCache.currency.code);
    return { geolocationData: valueCache, currencyData };
  }

  async getCurrencyRate(currencyCode: string) {
    const currencySystem =
      this._ecommerceGlobalConfig.currencyConfig.currencySystem;

    const currencyExpireHour =
      this._ecommerceGlobalConfig.currencyConfig.currencyExpireHour;

    const key = `${this.cacheCurrencyKeyString}-${currencyCode}`;
    let valueCache: CurrencyInterface = await this.cacheManager.get(key);
    if (!valueCache) {
      valueCache = await this._setCacheCurrency(
        key,
        currencySystem,
        currencyExpireHour,
        currencyCode,
      );
    }
    return valueCache;
  }

  async _setCacheGeolocation(key: string, ip: string) {
    try {
      const valueCache = await HttpRequest.get(
        `${this.baseUrl}ip/${ip}`,
        this._httpService,
        {
          api_key: this.api_key,
        },
      );
      const unixExpiration = getDateAdded(
        this.geoExpired,
        'hours',
        this._ecommerceGlobalConfig.defaultTimeZone,
        true,
      );
      this.cacheManager.set(key, valueCache, {
        ttl: Number(unixExpiration),
      });

      return valueCache;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async _setCacheCurrency(
    key: string,
    currencySystem: string,
    currencyExpireHour: string,
    currencyCode: string,
  ) {
    try {
      const valueCache = await HttpRequest.get(
        `${this.baseUrl}currency/convert`,
        this._httpService,
        {
          api_key: this.api_key,
          amount: 1,
          from: currencySystem,
          to: currencyCode,
        },
      );
      const unixExpiration =
        currencySystem !== currencyCode
          ? getTimeExpiredCurrencies(
              currencyExpireHour,
              this._ecommerceGlobalConfig.defaultTimeZone,
            )
          : 0;
      this.cacheManager.set(key, valueCache, {
        ttl: Number(unixExpiration),
      });

      return valueCache;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
