import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('DaesoGO')
    .setDescription('The DaesoGO API')
    .setVersion('1.0')
    .addTag('project')
    .build();

  const documnet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documnet);

  // await app.listen(3000, '0,0,0,0');
  app.use('/upload', express.static(join(__dirname, '../upload')));
  await app.listen(8000);
}
bootstrap();
