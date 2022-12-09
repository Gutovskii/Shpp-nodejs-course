import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
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
        private _repoWrapper: RepositoryWrapper
    ) {}
    
    async findByPage(page: number, count: number): Promise<PaginationResult<Person>> {
        return await this._repoWrapper.people.findByPage(page, count);
    }

    async findOne(id: number) {
        const person = await this._repoWrapper.people.findOne({
            where: { id },
            relations: {
                films: true,
                homeworld: true,
                starships: true,
                vehicles: true,
                species: true,
                publicImages: true,
                fileImages: true
            },
            loadEagerRelations: false
        });
        return person;
    }

    async create(person: Person, images: Express.Multer.File[]) {
        person.publicImages = await this._imagesService.createPublicImages(images);
        person.fileImages = await this._imagesService.createFileImages(images);
        return await this._repoWrapper.people.create(person);
    }

    async update(id: number, person: Person) {
        return await this._repoWrapper.people.update(id, person);
    }

    async remove(entity: Person) {
        await this._imagesService.deletePublicImages(entity.publicImages);
        await this._imagesService.deleteFileImages(entity.fileImages);
        return await this._repoWrapper.people.remove(entity);
    }

    async addImages(person: Person, images: Express.Multer.File[]) {
        person.publicImages.push(...await this._imagesService.createPublicImages(images));
        person.fileImages.push(...await this._imagesService.createFileImages(images));
        return await this._repoWrapper.people.save(person);
    }

    async addRelations(person: Person, relations: PersonRelations) {
        const updatedPerson = await this._relationsService.addRelations(person, {...relations});
        return await this._repoWrapper.people.save(updatedPerson);
    }

    async removeRelations(person: Person, relations: PersonRelations) {
        const updatedPerson = await this._relationsService.removeRelations(person, {...relations});
        return await this._repoWrapper.people.save(updatedPerson);
    }
}
