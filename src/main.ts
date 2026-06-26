import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Documentation for the Blog API.')
    .setContact(
      'Kevin Santamaria',
      'https://kevsantamaria.is-a.dev',
      'kevsantamaria01@gmail.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('0.8.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
