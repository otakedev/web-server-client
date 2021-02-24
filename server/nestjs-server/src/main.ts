import { env } from './environments/environments';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config();

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(env.project.prefix);

  const config = new DocumentBuilder()
    .setTitle(env.openApi.title)
    .setDescription(env.openApi.description)
    .setVersion(env.openApi.version)
    .addTag(env.openApi.tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.project.port);
}
bootstrap();
