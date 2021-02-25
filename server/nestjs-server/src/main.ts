import { env } from './environments/environments';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';


async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(env.project.prefix);

  const openApiConfig = new DocumentBuilder()
    .setTitle(env.openApi.title)
    .setDescription(env.openApi.description)
    .setVersion(env.openApi.version)
    .addTag(env.openApi.tag)
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.project.port);
}
bootstrap();
