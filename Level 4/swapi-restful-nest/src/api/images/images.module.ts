import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { S3 } from 'aws-sdk';

@Global()
@Module({
  providers: [
    ImagesService,
    {
      provide: S3,
      useValue: new S3(),
    },
  ],
  exports: [ImagesService],
  imports: [RepositoryModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
