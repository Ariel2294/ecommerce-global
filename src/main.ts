import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { loggerOptions } from './utils/logger';
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerOptions),
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;

  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
bootstrap();
