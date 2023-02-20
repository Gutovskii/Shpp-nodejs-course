import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwapiSeederService } from './seeders/swapi-seeder.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://swapi/dev/api/',
    }),
  ],
  providers: [SwapiSeederService],
})
export class SeederModule {}
