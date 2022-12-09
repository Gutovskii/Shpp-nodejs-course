import { Injectable } from '@nestjs/common';
import { DeleteImagesDto } from 'src/api/images/dto/delete-images.dto';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { In } from 'typeorm';
import { VehicleRelations } from './dto/vehicle-relations.dto';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {
    constructor(
        private _imagesService: ImagesService,
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper
    ) {}

    async findByPage(page: number, count: number): Promise<PaginationResult<Vehicle>> {
        return await this._repoWrapper.vehicles.findByPage(page, count);
    }

    async findOne(id: number) {
        const vehicle = await this._repoWrapper.vehicles.findOne({
            where: { id },
            relations: {
                films: true,
                pilots: true,
                publicImages: true,
                fileImages: true
            },
            loadEagerRelations: false
        });
        return vehicle;
    }

    async create(vehicle: Vehicle, images: Express.Multer.File[]) {
        vehicle.publicImages = await this._imagesService.createPublicImages(images);
        vehicle.fileImages = await this._imagesService.createFileImages(images);
        return await this._repoWrapper.vehicles.create(vehicle);
    }

    async update(id: number, vehicle: Vehicle) {
        return await this._repoWrapper.vehicles.update(id, vehicle);
    }

    async remove(entity: Vehicle) {
        await this._imagesService.deletePublicImages(entity.publicImages);
        await this._imagesService.deleteFileImages(entity.fileImages);
        return await this._repoWrapper.vehicles.remove(entity);
    }

    async addImages(vehicle: Vehicle, images: Express.Multer.File[]) {
        vehicle.publicImages.push(...await this._imagesService.createPublicImages(images));
        vehicle.fileImages.push(...await this._imagesService.createFileImages(images));
        return await this._repoWrapper.vehicles.save(vehicle);
    }
    async addRelations(vehicle: Vehicle, relations: VehicleRelations) {
        const updatedVehicle = await this._relationsService.addRelations(vehicle, {...relations});
        return await this._repoWrapper.vehicles.save(updatedVehicle);
    }

    async removeRelations(vehicle: Vehicle, relations: VehicleRelations) {
        const updatedVehicle = await this._relationsService.removeRelations(vehicle, {...relations});
        return await this._repoWrapper.vehicles.save(updatedVehicle);
    }
}
