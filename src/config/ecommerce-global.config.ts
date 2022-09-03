import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EcommerceGlobalConfig {
  constructor(private config: ConfigService) {}

  get environmentDevStatus(): {
    nodeEnv: string;
  } {
    return {
      nodeEnv: this.config.get<string>('NODE_ENV'),
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
}
