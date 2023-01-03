import { Mapper, ModelIdentifier } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, Logger } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, QueryRunner } from "typeorm";
import * as _ from "lodash";
import { axiosInstance } from "configs/axiosconfig";
import { ImagesService } from "src/api/images/images.service";
import { CreateFilmDto } from "src/api/swapi/films/dto/create-film.dto";
import { Film } from "src/api/swapi/films/film.entity";
import { CreatePersonDto } from "src/api/swapi/people/dto/create-person.dto";
import { Person } from "src/api/swapi/people/person.entity";
import { CreatePlanetDto } from "src/api/swapi/planets/dto/create-planet.dto";
import { Planet } from "src/api/swapi/planets/planet.entity";
import { CreateSpeciesDto } from "src/api/swapi/species/dto/create-species.dto";
import { Species } from "src/api/swapi/species/species.entity";
import { CreateStarshipDto } from "src/api/swapi/starships/dto/create-starship.dto";
import { Starship } from "src/api/swapi/starships/starship.entity";
import { CreateVehicleDto } from "src/api/swapi/vehicles/dto/create-vehicle.dto";
import { Vehicle } from "src/api/swapi/vehicles/vehicle.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";
import { SwapiEntity, SwapiPageResponse } from "src/common/interfaces/swapi-page-response.interface";
import { RelationsService } from "src/relations/relations.service";
import { RepositoryWrapper } from "src/repository/repository.wrapper";
import { SeederInterface } from "../seeders/seeder.interface";

@Injectable()
export class SwapiSeederService implements SeederInterface {
    private readonly entityNames = [
        'films',
        'people', 'pilots', 'characters', 'residents',
        'planets', 'homeworld',
        'species',
        'starships',
        'vehicles'
    ]

    private readonly _logger = new Logger(SwapiSeederService.name);

    constructor(
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper,
        private _imagesService: ImagesService,
        @InjectMapper() private _mapper: Mapper,
        @InjectEntityManager() private _entityManager: EntityManager
    ) {}

    async seed() {
        this._logger.log('Seeding swapi entities has been started');

        await this.seedEntities('films', Film, CreateFilmDto);
        await this.seedEntities('people', Person, CreatePersonDto);
        await this.seedEntities('planets', Planet, CreatePlanetDto);
        await this.seedEntities('species', Species, CreateSpeciesDto);
        await this.seedEntities('starships', Starship, CreateStarshipDto);
        await this.seedEntities('vehicles', Vehicle, CreateVehicleDto);

        await this.makeRelations('films');
        await this.makeRelations('people');
        await this.makeRelations('planets');
        await this.makeRelations('species');
        await this.makeRelations('starships');
        await this.makeRelations('vehicles');

        this._logger.log('Seeding swapi entities has been finished successfully!');
    }

    private async seedEntities(entityName: string, entityType: ModelIdentifier<EntityInterface>, dtoType: ModelIdentifier) {
        this._logger.log(`Seeding started: [${entityName}]`);
        const addedResults: Promise<EntityInterface[]>[] = [];
        let page = (await axiosInstance.get<SwapiPageResponse>(entityName, {data: {page: 1}})).data;
        for(let pageNum = 1;;pageNum++) {
            const entitiesToSeed: any[] = [];
            page.results.map(result => {
                const swapiEntity = _.mapKeys(result, (value, key) => _.camelCase(key)) as SwapiEntity;
                const entity = this._mapper.map(swapiEntity, dtoType, entityType) as EntityInterface;
                entity.id = this.getIdFromUrl(swapiEntity.url);
                entitiesToSeed.push(entity);
            });
            addedResults.push(this._repoWrapper[entityName as keyof RepositoryWrapper].createMany(entitiesToSeed));
            this._logger.log(`Done: ${entityName}?page=${pageNum}`);
            if (!page.next) break;
            page = (await axiosInstance.get<SwapiPageResponse>(page.next)).data;
        }
        await Promise.all(addedResults);
        this._logger.log(`Seeding finished: [${entityName}]`);
    }

    private async makeRelations(entityName: string) {
        this._logger.log(`Making relations started: [${entityName}]`);
        const addedRelations: Promise<void>[] = [];
        let page = (await axiosInstance.get<SwapiPageResponse>(entityName, {data: {page: 1}})).data;
        for (let pageNum = 1;;pageNum++) {
            page.results.map(result => {
                const swapiEntity = _.mapKeys(result, (value, key) => _.camelCase(key)) as SwapiEntity;
                const relationObject: {[key: string]: number[] | number} = {};
                for (const entityName of this.entityNames) {
                    if (swapiEntity.hasOwnProperty(entityName) && swapiEntity[entityName]) {
                        if (typeof swapiEntity[entityName] === 'object') {
                            relationObject[entityName] = (swapiEntity[entityName] as string[]).map(url => this.getIdFromUrl(url));
                        }
                        else if (typeof swapiEntity[entityName] === 'string') {
                            relationObject[entityName] = this.getIdFromUrl(swapiEntity[entityName] as string);
                        }
                    }
                }
                const entityId = this.getIdFromUrl(swapiEntity.url);
                addedRelations.push(new Promise(async resolve => {
                    const entityToUpdate = await this._repoWrapper[entityName as keyof RepositoryWrapper].findOne({where: {id: entityId}});
                    const updatedEntity = await this._relationsService.addRelations(entityToUpdate, relationObject) as any;
                    await this._repoWrapper[entityName as keyof RepositoryWrapper].save(updatedEntity);
                    resolve();
                }));
            });
            this._logger.log(`Done: ${entityName}?page=${pageNum}`);
            if (!page.next) break;
            page = (await axiosInstance.get<SwapiPageResponse>(page.next)).data;
        }
        await Promise.all(addedRelations);
        this._logger.log(`Making relations finished: [${entityName}]`);
    }

    private getIdFromUrl(url: string) {
        return +url.match(/(?<=\/)\d+(?=\/)/gm)[0];
    }

    // example how I was reverting seeded data (also deleting all images)
    // so I don't use this method also like internal
    async truncate(queryRunner: QueryRunner) {
        this._logger.log('Truncating swapi entities has been started');

        await this.truncateTables(queryRunner);
        await this.deleteAllImages();

        this._logger.log('Truncating swapi entities has been finished successfully!');
    }

    private async truncateTables(queryRunner: QueryRunner) {
        this._logger.log("Truncating tables started");
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
        await queryRunner.query('TRUNCATE TABLE film');
        await queryRunner.query('TRUNCATE TABLE person');
        await queryRunner.query('TRUNCATE TABLE planet');
        await queryRunner.query('TRUNCATE TABLE vehicle');
        await queryRunner.query('TRUNCATE TABLE species');
        await queryRunner.query('TRUNCATE TABLE starship');
        await queryRunner.query('TRUNCATE TABLE film_characters_person');
        await queryRunner.query('TRUNCATE TABLE film_planets_planet');
        await queryRunner.query('TRUNCATE TABLE film_species_species');
        await queryRunner.query('TRUNCATE TABLE film_starships_starship');
        await queryRunner.query('TRUNCATE TABLE film_vehicles_vehicle');
        await queryRunner.query('TRUNCATE TABLE person_species_species');
        await queryRunner.query('TRUNCATE TABLE starship_pilots_person');
        await queryRunner.query('TRUNCATE TABLE vehicle_pilots_person');
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
        this._logger.log("Truncating tables finished");
    }

    private async deleteAllImages() {
        this._logger.log("Deleting images started");
        const [publicImages, fileImages] = await Promise.all([
            this._repoWrapper.publicImages.find({}),
            this._repoWrapper.fileImages.find({})
        ]);
        await Promise.all([
            this._imagesService.deletePublicImages(publicImages),
            this._imagesService.deleteFileImages(fileImages)
        ]);
        this._logger.log("Deleting images finished");
    }
}