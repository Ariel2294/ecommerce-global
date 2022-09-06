import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EcommerceGlobalEnv {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsString()
  @IsOptional()
  MODE = 'production';

  @IsString()
  @IsNotEmpty()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URI: string;

  @IsString()
  @IsOptional()
  TZ = 'America/Mexico_City';

  @IsString()
  @IsOptional()
  IP_DEVELOP = '169.57.37.1';

  @IsString()
  @IsNotEmpty()
  GEO_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  GEO_API_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  CACHE_REDIS_URL: string;

  @IsString()
  @IsNotEmpty()
  CACHE_REDIS_DEFAULT_TTL: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  CACHE_REDIS_DEFAULT_GEO_EXPIRE = 24;

  @IsString()
  @IsNotEmpty()
  CURRENCY_SYSTEM: string;

  @IsString()
  @IsNotEmpty()
  CURRENCY_EXPIRE_HOUR = '23:59:59';

  @IsString()
  @IsNotEmpty()
  WS_BUCKET_NAME: string;

  @IsString()
  @IsNotEmpty()
  WS_ACCESS_KEYID: string;

  @IsString()
  @IsNotEmpty()
  WS_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  WS_ENDPOINT: string;

  @IsString()
  @IsNotEmpty()
  STATIC_TOKEN: string;
}
