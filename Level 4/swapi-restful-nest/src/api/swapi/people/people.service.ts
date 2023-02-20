import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { PersonRelations } from './dto/person-relations.dto';
import { Person } from './person.entity';

@Injectable()
export class PeopleService {
  constructor(
    private _imagesService: ImagesService,
    private _relationsService: RelationsService,
    private _repoWrapper: RepositoryWrapper,
  ) {}

  findByPage(page: number, count: number): Promise<PaginationResult<Person>> {
    return this._repoWrapper.people.findByPage(page, count);
  }

  findOne(id: number, missRelations?: boolean): Promise<Person> {
    const person = this._repoWrapper.people.findOne({
      where: { id },
      relations: missRelations
        ? {}
        : {
            films: true,
            homeworld: true,
            starships: true,
            vehicles: true,
            species: true,
            publicImages: true,
            fileImages: true,
          },
      loadEagerRelations: false,
    });
    return person;
  }

  async exists(id: number): Promise<boolean> {
    const person = await this._repoWrapper.people.findOne({
      where: { id },
      select: ['id'],
    });
    return !!person;
  }

  async create(person: Person, images: Express.Multer.File[]): Promise<Person> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.createPublicImages(images),
      this._imagesService.createFileImages(images),
    ]);
    person.publicImages = publicImages;
    person.fileImages = fileImages;
    return this._repoWrapper.people.create(person);
  }

  update(id: number, person: Person): Promise<Person> {
    return this._repoWrapper.people.update(id, person);
  }

  async remove(person: Person): Promise<Person> {
    await Promise.all([
      this._imagesService.deletePublicImages(person.publicImages),
      this._imagesService.deleteFileImages(person.fileImages),
    ]);
    return this._repoWrapper.people.remove(person);
  }

  async addImages(
    person: Person,
    images: Express.Multer.File[],
  ): Promise<Person> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.createPublicImages(images),
      this._imagesService.createFileImages(images),
    ]);
    person.publicImages.push(...publicImages);
    person.fileImages.push(...fileImages);
    return this._repoWrapper.people.save(person);
  }

  async addRelations(
    person: Person,
    relations: PersonRelations,
  ): Promise<Person> {
    const updatedPerson = await this._relationsService.addRelations(person, {
      ...relations,
    });
    return this._repoWrapper.people.save(updatedPerson);
  }

  async removeRelations(
    person: Person,
    relations: PersonRelations,
  ): Promise<Person> {
    const updatedPerson = await this._relationsService.removeRelations(person, {
      ...relations,
    });
    return this._repoWrapper.people.save(updatedPerson);
  }
}
