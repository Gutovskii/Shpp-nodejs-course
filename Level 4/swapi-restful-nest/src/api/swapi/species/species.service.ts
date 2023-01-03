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

    findByPage(page: number, count: number): Promise<PaginationResult<Species>> {
        return this._repoWrapper.species.findByPage(page, count);
    }

    findOne(id: number): Promise<Species> {
        const species = this._repoWrapper.species.findOne({
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

    async create(species: Species, images: Express.Multer.File[]): Promise<Species> {
        const [publicImages, fileImages] = await Promise.all([
            this._imagesService.createPublicImages(images),
            this._imagesService.createFileImages(images)
        ]);
        species.publicImages = publicImages;
        species.fileImages = fileImages
        return this._repoWrapper.species.create(species);
    }

    update(id: number, species: Species): Promise<Species> {
        return this._repoWrapper.species.update(id, species);
    }

    async remove(species: Species): Promise<Species> {
        await Promise.all([
            this._imagesService.deletePublicImages(species.publicImages),
            this._imagesService.deleteFileImages(species.fileImages)
        ]);
        return this._repoWrapper.species.remove(species);
    }

    async addImages(species: Species, images: Express.Multer.File[]): Promise<Species> {
        const [publicImages, fileImages] = await Promise.all([
            this._imagesService.createPublicImages(images),
            this._imagesService.createFileImages(images)
        ]);
        species.publicImages.push(...publicImages);
        species.fileImages.push(...fileImages);
        return this._repoWrapper.species.save(species);
    }

    async addRelations(species: Species, relations: SpeciesRelations): Promise<Species> {
        const updatedSpecies = await this._relationsService.addRelations(species, {...relations});
        return this._repoWrapper.species.save(updatedSpecies);
    }

    async removeRelations(species: Species, relations: SpeciesRelations): Promise<Species> {
        const updatedSpecies = await this._relationsService.removeRelations(species, {...relations});
        return this._repoWrapper.species.save(updatedSpecies);
    }
}
