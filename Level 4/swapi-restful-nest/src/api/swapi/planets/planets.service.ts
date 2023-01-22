import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/classes/pagination.class';
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

    findByPage(page: number, count: number): Promise<PaginationResult<Planet>> {
        return this._repoWrapper.planets.findByPage(page, count);
    }

    findOne(id: number): Promise<Planet> {
        const planet = this._repoWrapper.planets.findOne({
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

    async exists(id: number): Promise<boolean> {
        const planet = await this._repoWrapper.planets.findOne({
            where: { id },
            select: ['id']
        });
        return !!planet;
    }

    async create(planet: Planet, images: Express.Multer.File[]): Promise<Planet> {
        const [publicImages, fileImages] = await Promise.all([
            this._imagesService.createPublicImages(images),
            this._imagesService.createFileImages(images)
        ]);
        planet.publicImages = publicImages;
        planet.fileImages = fileImages;
        return this._repoWrapper.planets.create(planet);
    }

    update(id: number, planet: Planet): Promise<Planet> {
        return this._repoWrapper.planets.update(id, planet);
    }

    async remove(planet: Planet): Promise<Planet> {
        await Promise.all([
            this._imagesService.deletePublicImages(planet.publicImages),
            this._imagesService.deleteFileImages(planet.fileImages)
        ]);
        return this._repoWrapper.planets.remove(planet);
    }

    async addImages(planet: Planet, images: Express.Multer.File[]): Promise<Planet> {
        const [publicImages, fileImages] = await Promise.all([
            this._imagesService.createPublicImages(images),
            this._imagesService.createFileImages(images)
        ]);
        planet.publicImages.push(...publicImages);
        planet.fileImages.push(...fileImages);
        return this._repoWrapper.planets.save(planet);
    }

    async addRelations(planet: Planet, relations: PlanetRelations): Promise<Planet> {
        const updatedPlanet = await this._relationsService.addRelations(planet, {...relations});
        return this._repoWrapper.planets.save(updatedPlanet);
    }

    async removeRelations(planet: Planet, relations: PlanetRelations): Promise<Planet> {
        const updatedPlanet = await this._relationsService.removeRelations(planet, {...relations});
        return this._repoWrapper.planets.save(updatedPlanet);
    }
}
