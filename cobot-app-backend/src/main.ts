/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  // Créez l'application NestJS et configurez-la
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe());

  // Démarrez le serveur HTTP principal
  await app.listen(3000, () => {
    console.log('HTTP Server listening on port 3000');

    // Démarrez le serveur TCP après que le serveur HTTP principal soit prêt

  });
}


bootstrap();