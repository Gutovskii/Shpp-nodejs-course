import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/classes/pagination.class';
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
    private _repoWrapper: RepositoryWrapper,
  ) {}

  findByPage(page: number, count: number): Promise<PaginationResult<Film>> {
    return this._repoWrapper.films.findByPage(page, count);
  }

  findOne(id: number): Promise<Film> {
    const film = this._repoWrapper.films.findOne({
      where: { id },
      relations: {
        characters: true,
        planets: true,
        starships: true,
        vehicles: true,
        species: true,
        publicImages: true,
        fileImages: true,
      },
      loadEagerRelations: false,
    });
    return film;
  }

  async exists(id: number): Promise<boolean> {
    const film = await this._repoWrapper.films.findOne({
      where: { id },
      select: ['id'],
    });
    return !!film;
  }

  async create(film: Film, images: Express.Multer.File[]): Promise<Film> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.createPublicImages(images),
      this._imagesService.createFileImages(images),
    ]);
    film.publicImages = publicImages;
    film.fileImages = fileImages;
    return this._repoWrapper.films.create(film);
  }

  update(id: number, film: Film): Promise<Film> {
    return this._repoWrapper.films.update(id, film);
  }

  async remove(film: Film): Promise<Film> {
    await Promise.all([
      this._imagesService.deletePublicImages(film.publicImages),
      this._imagesService.deleteFileImages(film.fileImages),
    ]);
    return this._repoWrapper.films.remove(film);
  }

  async addImages(film: Film, images: Express.Multer.File[]): Promise<Film> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.createPublicImages(images),
      this._imagesService.createFileImages(images),
    ]);
    film.publicImages.push(...publicImages);
    film.fileImages.push(...fileImages);
    return this._repoWrapper.films.save(film);
  }

  async addRelations(film: Film, relations: FilmRelations): Promise<Film> {
    const updatedFilm = await this._relationsService.addRelations(film, {
      ...relations,
    });
    return this._repoWrapper.films.save(updatedFilm);
  }

  async removeRelations(film: Film, relations: FilmRelations): Promise<Film> {
    const updatedFilm = await this._relationsService.removeRelations(film, {
      ...relations,
    });
    return this._repoWrapper.films.save(updatedFilm);
  }
}
