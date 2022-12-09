import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { PlanetsProfile } from './planets.profile';

@Module({
    controllers: [PlanetsController],
    providers: [PlanetsService, PlanetsProfile],
})
export class PlanetsModule {}
