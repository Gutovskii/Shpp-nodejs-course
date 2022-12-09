import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle } from "./vehicle.entity";

@Injectable()
export class VehiclesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, CreateVehicleDto, Vehicle);
            createMap(mapper, UpdateVehicleDto, Vehicle);
        }
    }
}