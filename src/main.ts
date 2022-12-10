import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create( AppModule, { cors: true } );
  const logger = new Logger('Bootstrap');

  app.use(json({ limit: process.env.BODY_SIZE_LIMIT }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Emotions APP API')
    .setVersion('0.1')
    .build();
  
  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( '', app, document );

  await app.listen( process.env.PORT );
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
