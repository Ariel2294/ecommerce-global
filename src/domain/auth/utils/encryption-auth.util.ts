import { Injectable } from '@nestjs/common';
import * as Cryptr from 'cryptr';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';
@Injectable()
export class EncrytionAuth {
  constructor(private readonly _configService: EcommerceGlobalConfig) {}

  cryptr = new Cryptr(this._configService.authConfig.tokenEncryption);

  encrypt(textToEncrypt: string) {
    return this.cryptr.encrypt(textToEncrypt);
  }
  decrypt(textToDecrypt: string) {
    return this.cryptr.decrypt(textToDecrypt);
  }
}
