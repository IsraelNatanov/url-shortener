import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: '*', 
    methods: 'GET,POST,DELETE,PUT,PATCH,OPTIONS', 
    allowedHeaders: 'Content-Type, api_key, Authorization',
  });
  
  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('The URL Shortener API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  app.setGlobalPrefix('api');
  await app.listen(3001);
  console.log('URL Shortener microservice running on http://localhost:3001');
}
bootstrap();
