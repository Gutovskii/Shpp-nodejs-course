import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SpeciesProfile } from './species.profile';

@Module({
    controllers: [SpeciesController],
    providers: [SpeciesService, SpeciesProfile],
})
export class SpeciesModule {}
