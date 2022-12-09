import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { FilmRelations } from './dto/film-relations.dto';
import { Film } from './film.entity';

@Injectable()
export class FilmsService {
    constructor(
        private _imagesService: ImagesService,
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper
    ) {}

    async findByPage(page: number, count: number): Promise<PaginationResult<Film>> {
        return await this._repoWrapper.films.findByPage(page, count);
    }

    async findOne(id: number) {
        const film = await this._repoWrapper.films.findOne({
            where: { id },
            relations: {
                characters: true,
                planets: true,
                starships: true,
                vehicles: true,
                species: true,
                publicImages: true,
                fileImages: true
            },
            loadEagerRelations: false
        });
        return film;
    }

    async create(film: Film, images: Express.Multer.File[]) {
        film.publicImages = await this._imagesService.createPublicImages(images);
        film.fileImages = await this._imagesService.createFileImages(images);
        return await this._repoWrapper.films.create(film);
    }

    async update(id: number, film: Film) {
        return await this._repoWrapper.films.update(id, film);
    }

    async remove(entity: Film) {
        await this._imagesService.deletePublicImages(entity.publicImages);
        await this._imagesService.deleteFileImages(entity.fileImages);
        return await this._repoWrapper.films.remove(entity);
    }

    async addImages(film: Film, images: Express.Multer.File[]) {
        film.publicImages.push(...await this._imagesService.createPublicImages(images));
        film.fileImages.push(...await this._imagesService.createFileImages(images));
        return await this._repoWrapper.films.save(film);
    }

    async addRelations(film: Film, relations: FilmRelations) {
        const updatedFilm = await this._relationsService.addRelations(film, {...relations});
        return await this._repoWrapper.films.save(updatedFilm);
    }

    async removeRelations(film: Film, relations: FilmRelations) {
        const updatedFilm = await this._relationsService.removeRelations(film, {...relations});
        return await this._repoWrapper.films.save(updatedFilm);
    }
}
