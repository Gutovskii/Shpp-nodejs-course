import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { SwapiSeederService } from "src/seeder/seeders/swapi-seeder.service";
import { MigrationInterface, QueryRunner } from "typeorm"

// example how I was doing seeding
export class SwapiSeeds1670415046715 implements MigrationInterface {
    name = "SwapiSeeds1670415046715"

    public async up(queryRunner: QueryRunner): Promise<void> {
        const seederModule = await NestFactory.create(AppModule);
        const swapiSeederService = seederModule.get(SwapiSeederService);
        await swapiSeederService.seed();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const seederModule = await NestFactory.create(AppModule);
        const swapiSeederService = seederModule.get(SwapiSeederService);
        await swapiSeederService.truncate(queryRunner);
    }
}
