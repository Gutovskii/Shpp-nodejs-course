import { Module } from "@nestjs/common";
import { SwapiSeederService } from "./seeders/swapi-seeder.service";

@Module({
    providers: [SwapiSeederService]
})
export class SeederModule {}