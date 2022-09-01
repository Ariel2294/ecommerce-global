import { IsNotEmpty, IsString } from 'class-validator';

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
}
