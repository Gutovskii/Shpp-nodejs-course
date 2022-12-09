import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from 'src/repository/repository.module';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Global()
@Module({
  providers: [ImagesService],
  exports: [ImagesService],
  imports: [RepositoryModule, ConfigModule],
  controllers: [ImagesController]
})
export class ImagesModule {}
