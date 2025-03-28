import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for your deployed frontend
  app.enableCors({
    origin: [
      'http://localhost:5180',
      'https://gray-plant-031837210.6.azurestaticapps.net',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Use environment variable for port or default to 8080 (Azure's default)
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
