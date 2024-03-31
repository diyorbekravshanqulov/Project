import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const PORT = process.env.PORT || 3030; // Default port to 3000 if PORT environment variable is not set

    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('Stadium Project')
      .setDescription('Stadium REST API')
      .setVersion('1.0')
      .addTag('NestJS, Nodejs, Postgres, Bot, SMS, Sequezlize, Swagger, Mailer')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT); // Removed the callback function from listen(), unnecessary since we're already using async/await
    console.log(` http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error starting server:', error); // Log error with console.error for better visibility
  }
}

start();
