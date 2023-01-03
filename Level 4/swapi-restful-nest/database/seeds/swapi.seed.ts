import { Injectable } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { SwapiSeederService } from "src/seeder/seeders/swapi-seeder.service";
import { Connection } from "typeorm";
import { Factory, Seeder } from 'typeorm-seeding';

@Injectable()
export default class SwapiSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const appModule = await NestFactory.create(AppModule);
        const swapiSeederService = appModule.get(SwapiSeederService);
        await swapiSeederService.seed();
    }
}