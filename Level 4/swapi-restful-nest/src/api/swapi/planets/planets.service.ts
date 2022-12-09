import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { PlanetRelations } from './dto/planet-relations.dto';
import { Planet } from './planet.entity';

@Injectable()
export class PlanetsService {
    constructor(
        private _imagesService: ImagesService,
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper
    ) {}

    async findByPage(page: number, count: number): Promise<PaginationResult<Planet>> {
        return await this._repoWrapper.planets.findByPage(page, count);
    }

    async findOne(id: number) {
        const planet = await this._repoWrapper.planets.findOne({
            where: { id },
            relations: {
                films: true,
                residents: true,
                species: true,
                publicImages: true,
                fileImages: true
            },
            loadEagerRelations: false
        });
        return planet;
    }

    async create(planet: Planet, images: Express.Multer.File[]) {
        planet.publicImages = await this._imagesService.createPublicImages(images);
        planet.fileImages = await this._imagesService.createFileImages(images);
        return await this._repoWrapper.planets.create(planet);
    }

    async update(id: number, planet: Planet) {
        return await this._repoWrapper.planets.update(id, planet);
    }

    async remove(entity: Planet) {
        await this._imagesService.deletePublicImages(entity.publicImages);
        await this._imagesService.deleteFileImages(entity.fileImages);
        return await this._repoWrapper.planets.remove(entity);
    }

    async addImages(planet: Planet, images: Express.Multer.File[]) {
        planet.publicImages.push(...await this._imagesService.createPublicImages(images));
        planet.fileImages.push(...await this._imagesService.createFileImages(images));
        return await this._repoWrapper.planets.save(planet);
    }

    async addRelations(planet: Planet, relations: PlanetRelations) {
        const updatedPlanet = await this._relationsService.addRelations(planet, {...relations});
        return await this._repoWrapper.planets.save(updatedPlanet);
    }

    async removeRelations(planet: Planet, relations: PlanetRelations) {
        const updatedPlanet = await this._relationsService.removeRelations(planet, {...relations});
        return await this._repoWrapper.planets.save(updatedPlanet);
    }
}
