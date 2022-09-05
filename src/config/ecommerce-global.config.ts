import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EcommerceGlobalConfig {
  constructor(private config: ConfigService) {}

  get environmentDevStatus(): {
    nodeEnv: string;
    mode: string;
  } {
    return {
      nodeEnv: this.config.get<string>('NODE_ENV'),
      mode: this.config.get<string>('MODE'),
    };
  }

  get databaseURL(): string {
    return this.config.get('DATABASE_URI');
  }

  get authConfig(): {
    tokenEncryption: string;
    jwtSecret: string;
  } {
    return {
      tokenEncryption: this.config.get('TOKEN_ENCRYPTION'),
      jwtSecret: this.config.get('JWT_SECRET'),
    };
  }

  get defaultTimeZone(): string {
    return this.config.get('TZ');
  }

  get geoLocationConfig(): {
    ipDevelop: string;
    tokenGeoApi: string;
    baseUrlGeoApi: string;
  } {
    return {
      ipDevelop: this.config.get('IP_DEVELOP'),
      tokenGeoApi: this.config.get('GEO_API_KEY'),
      baseUrlGeoApi: this.config.get('GEO_API_BASE_URL'),
    };
  }

  get redisConfig(): {
    url: string;
    ttl: number;
    hoursGeoExpired: number;
  } {
    return {
      url: this.config.get('CACHE_REDIS_URL'),
      ttl: this.config.get('CACHE_REDIS_DEFAULT_TTL'),
      hoursGeoExpired: this.config.get('CACHE_REDIS_DEFAULT_GEO_EXPIRE'),
    };
  }

  get currencyConfig(): {
    currencySystem: string;
    currencyExpireHour: string;
  } {
    return {
      currencySystem: this.config.get('CURRENCY_SYSTEM'),
      currencyExpireHour: this.config.get('CURRENCY_EXPIRE_HOUR'),
    };
  }
}
