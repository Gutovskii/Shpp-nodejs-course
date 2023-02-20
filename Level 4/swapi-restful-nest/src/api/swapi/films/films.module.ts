import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsProfile } from './films.profile';
import { FilmsService } from './films.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, FilmsProfile],
})
export class FilmsModule {}
