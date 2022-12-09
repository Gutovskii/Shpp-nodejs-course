import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CommonInterceptor } from './common/interceptors/common.interceptor';
import { BadRequestFilter } from './common/filters/bad-request.filter';
import { NotFoundFilter } from './common/filters/not-found.filter.ts.filter';
import { CommonEnum } from './common/common.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 404;

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new CommonInterceptor());
  app.useGlobalFilters(new BadRequestFilter(), new NotFoundFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Swapi nestjs integration')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }, CommonEnum.OPENAPI_JWT_NAME)
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
