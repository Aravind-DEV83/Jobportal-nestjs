import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ConfigService } from 'src/config/config.service';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Job Portal Application')
    .setDescription('The Job Portal API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Jobs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(ConfigService.getPort());
}
bootstrap().catch((err) => {
  console.log('Unexpected error; exiting the application', err);
  process.exitCode = 1;
});
