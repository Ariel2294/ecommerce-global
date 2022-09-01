import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ArgumentInvalidException } from '../common/argument-invalid.exception';
import { validationErrorsToString } from '../utils';
import { EcommerceGlobalEnv } from './ecommerce-global.env';

export function EcommerceGlobalServiceValidateConfig(
  config: Record<string, unknown>,
): EcommerceGlobalEnv {
  const validatedConfig = plainToClass(EcommerceGlobalEnv, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new ArgumentInvalidException(validationErrorsToString(errors));
  }

  return validatedConfig;
}
