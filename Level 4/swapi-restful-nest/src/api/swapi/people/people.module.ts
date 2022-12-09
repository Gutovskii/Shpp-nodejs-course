import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleProfile } from './people.profile';

@Module({
    controllers: [PeopleController],
    providers: [PeopleService, PeopleProfile]
})
export class PeopleModule {}
