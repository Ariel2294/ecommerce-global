import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  const environment =
    configService.get<string>('NODE_ENV') || process.env.NODE_ENV;
  const corsOrigin =
    configService.get<string>('CORS_ORIGIN') || process.env.CORS_ORIGIN;
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .addApiKey(
      {
        type: 'apiKey',
        name: 'ApiKey',
        in: 'header',
        description:
          'Use Static abb07153a8235fda8ad3e99c711844e73fca4aca46efdd2b1414dd246630a82c',
      },
      'StaticToken',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setTitle('Ecommerce global api demo')
    .setDescription(
      'This is the api documentation for ecommerce global service',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  if (environment === 'production') {
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: corsOrigin,
    allowedHeaders: ['Content-Type', 'Authorization', 'ApiKey', 'ip-address'],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
bootstrap();
