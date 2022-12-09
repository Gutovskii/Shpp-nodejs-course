import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesProfile } from './vehicles.profile';

@Module({
    controllers: [VehiclesController],
    providers: [VehiclesService, VehiclesProfile],
})
export class VehiclesModule {}
