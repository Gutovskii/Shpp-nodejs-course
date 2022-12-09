import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { CreateSpeciesDto } from "./dto/create-species.dto";
import { UpdateSpeciesDto } from "./dto/update-species.dto";
import { Species } from "./species.entity";

@Injectable()
export class SpeciesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, CreateSpeciesDto, Species);
            createMap(mapper, UpdateSpeciesDto, Species);
        }
    }
}