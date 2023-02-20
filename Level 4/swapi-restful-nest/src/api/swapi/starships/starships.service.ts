import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/classes/pagination.class';
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
    private _repoWrapper: RepositoryWrapper,
  ) {}

  findByPage(page: number, count: number): Promise<PaginationResult<Starship>> {
    return this._repoWrapper.starships.findByPage(page, count);
  }

  findOne(id: number): Promise<Starship> {
    const starship = this._repoWrapper.starships.findOne({
      where: { id },
      relations: {
        films: true,
        pilots: true,
        publicImages: true,
        fileImages: true,
      },
      loadEagerRelations: false,
    });
    return starship;
  }

  async exists(id: number): Promise<boolean> {
    const starship = await this._repoWrapper.starships.findOne({
      where: { id },
      select: ['id'],
    });
    return !!starship;
  }

  async create(
    starship: Starship,
    images: Express.Multer.File[],
  ): Promise<Starship> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.createPublicImages(images),
      this._imagesService.createFileImages(images),
    ]);
    starship.publicImages = publicImages;
    starship.fileImages = fileImages;
    return this._repoWrapper.starships.create(starship);
  }

  update(id: number, starship: Starship): Promise<Starship> {
    return this._repoWrapper.starships.update(id, starship);
  }

  async remove(starship: Starship): Promise<Starship> {
    await Promise.all([
      this._imagesService.deletePublicImages(starship.publicImages),
      this._imagesService.deleteFileImages(starship.fileImages),
    ]);
    return this._repoWrapper.starships.remove(starship);
  }

  async addImages(
    starship: Starship,
    images: Express.Multer.File[],
  ): Promise<Starship> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.createPublicImages(images),
      this._imagesService.createFileImages(images),
    ]);
    starship.publicImages.push(...publicImages);
    starship.fileImages.push(...fileImages);
    return this._repoWrapper.starships.save(starship);
  }

  async addRelations(
    starship: Starship,
    relations: StarshipRelations,
  ): Promise<Starship> {
    const updatedVehicle = await this._relationsService.addRelations(starship, {
      ...relations,
    });
    return this._repoWrapper.starships.save(updatedVehicle);
  }

  async removeRelations(
    starship: Starship,
    relations: StarshipRelations,
  ): Promise<Starship> {
    const updatedVehicle = await this._relationsService.removeRelations(
      starship,
      { ...relations },
    );
    return this._repoWrapper.starships.save(updatedVehicle);
  }
}
