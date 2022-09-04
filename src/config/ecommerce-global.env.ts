import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EcommerceGlobalEnv {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URI: string;

  @IsString()
  @IsOptional()
  TZ = 'America/Mexico_City';
}
