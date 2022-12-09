import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { StarshipRelations } from './dto/starship-relations.dto';
import { Starship } from './starship.entity';

@Injectable()
export class StarshipsService {
    constructor(
        private _imagesService: ImagesService,
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper
    ) {}

    async findByPage(page: number, count: number): Promise<PaginationResult<Starship>> {
        return await this._repoWrapper.starships.findByPage(page, count);
    }

    async findOne(id: number) {
        const starship = await this._repoWrapper.starships.findOne({
            where: { id },
            relations: {
                films: true,
                pilots: true,
                publicImages: true,
                fileImages: true
            },
            loadEagerRelations: false
        });
        return starship;
    }

    async create(starship: Starship, images: Express.Multer.File[]) {
        starship.publicImages = await this._imagesService.createPublicImages(images);
        starship.fileImages = await this._imagesService.createFileImages(images);
        return await this._repoWrapper.starships.create(starship);
    }

    async update(id: number, starship: Starship) {
        return await this._repoWrapper.starships.update(id, starship);
    }

    async remove(entity: Starship) {
        await this._imagesService.deletePublicImages(entity.publicImages);
        await this._imagesService.deleteFileImages(entity.fileImages);
        return await this._repoWrapper.starships.remove(entity);
    }

    async addImages(starship: Starship, images: Express.Multer.File[]) {
        starship.publicImages.push(...await this._imagesService.createPublicImages(images));
        starship.fileImages.push(...await this._imagesService.createFileImages(images));
        return await this._repoWrapper.starships.save(starship);
    }

    async addRelations(starship: Starship, relations: StarshipRelations) {
        const updatedVehicle = await this._relationsService.addRelations(starship, {...relations});
        return await this._repoWrapper.starships.save(updatedVehicle);
    }

    async removeRelations(starship: Starship, relations: StarshipRelations) {
        const updatedVehicle = await this._relationsService.removeRelations(starship, {...relations});
        return await this._repoWrapper.starships.save(updatedVehicle);
    }
}
