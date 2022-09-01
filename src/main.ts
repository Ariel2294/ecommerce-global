import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;

  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
bootstrap();
