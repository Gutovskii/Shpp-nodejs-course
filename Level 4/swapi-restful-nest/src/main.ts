import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CommonInterceptor } from './common/interceptors/common.interceptor';
import { BadRequestFilter } from './common/filters/bad-request.filter';
import { NotFoundFilter } from './common/filters/not-found.filter.ts.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { OPENAPI_JWT_NAME } from './api/auth/decorators/auth.decorator';
import { config } from './common/config';
import { PaginationResult } from './common/classes/pagination.class';

console.time('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix('api')
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new CommonInterceptor())
    .useGlobalFilters(new BadRequestFilter(), new NotFoundFilter()); // global filters

  const PORT = process.env.PORT || 404;

  const configService = app.get(ConfigService);
  const env = configService.get<typeof config.env>('env');
  if (env && env === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Swapi nestjs integration')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        OPENAPI_JWT_NAME,
      )
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      extraModels: [PaginationResult],
    });
    SwaggerModule.setup('swagger', app, swaggerDocument);
  }

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  console.timeEnd('bootstrap');
}
bootstrap();
