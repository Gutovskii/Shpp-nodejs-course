import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { StarshipsProfile } from './starhips.profile';

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsService, StarshipsProfile],
})
export class StarshipsModule {}
