import * as winston from 'winston';

import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

export const loggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.LOGGER_LEVEL,
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.align(),
        nestWinstonModuleUtilities.format.nestLike('EcommerceGlobalService', {
          prettyPrint: false,
        }),
      ),
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
};

export function createContextWinston(
  constructorName: string,
  functionName: string,
) {
  return {
    context: constructorName,
    function: functionName,
  };
}
