import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ormConfig } from 'configs/ormconfig';
import { SwapiModule } from './api/swapi/swapi.module';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { ImagesModule } from './api/images/images.module';
import { RepositoryModule } from './repository/repository.module';
import { RelationsModule } from './relations/relations.module';
import { SeederModule } from './seeder/seeder.module';
import { CommonEnum } from './common/common.enum';
import { PaginationMiddleware } from './common/middleware/pagination.middleware';
import * as Joi from 'joi';
import { getConfig } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASS: Joi.string().allow(''),
        MYSQL_NAME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required()
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: CommonEnum.FILES_PUBLIC_PATH
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    TypeOrmModule.forRoot(ormConfig),
    SwapiModule,
    ImagesModule,
    RepositoryModule,
    RelationsModule,
    AuthModule,
    UsersModule,
    RolesModule,
    SeederModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
