import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { SpeciesRelations } from './dto/species-relations.dto';
import { Species } from './species.entity';

@Injectable()
export class SpeciesService {
    constructor(
        private _imagesService: ImagesService,
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper
    ) {}

    async findByPage(page: number, count: number): Promise<PaginationResult<Species>> {
        return await this._repoWrapper.species.findByPage(page, count);
    }

    async findOne(id: number) {
        const species = await this._repoWrapper.species.findOne({
            where: { id },
            relations: {
                homeworld: true,
                people: true,
                films: true,
                publicImages: true,
                fileImages: true
            },
            loadEagerRelations: false
        });
        return species;
    }

    async create(species: Species, images: Express.Multer.File[]) {
        species.publicImages = await this._imagesService.createPublicImages(images);
        species.fileImages = await this._imagesService.createFileImages(images);
        return await this._repoWrapper.species.create(species);
    }

    async update(id: number, species: Species) {
        return await this._repoWrapper.species.update(id, species);
    }

    async remove(entity: Species) {
        await this._imagesService.deletePublicImages(entity.publicImages);
        await this._imagesService.deleteFileImages(entity.fileImages);
        return await this._repoWrapper.species.remove(entity);
    }

    async addImages(species: Species, images: Express.Multer.File[]) {
        species.publicImages.push(...await this._imagesService.createPublicImages(images));
        species.fileImages.push(...await this._imagesService.createFileImages(images));
        return await this._repoWrapper.species.save(species);
    }

    async addRelations(species: Species, relations: SpeciesRelations) {
        const updatedSpecies = await this._relationsService.addRelations(species, {...relations});
        return await this._repoWrapper.species.save(updatedSpecies);
    }

    async removeRelations(species: Species, relations: SpeciesRelations) {
        const updatedSpecies = await this._relationsService.removeRelations(species, {...relations});
        return await this._repoWrapper.species.save(updatedSpecies);
    }
}
