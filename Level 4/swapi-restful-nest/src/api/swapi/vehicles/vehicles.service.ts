import { Injectable } from '@nestjs/common';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { ImagesService } from 'src/api/images/images.service';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { VehicleRelations } from './dto/vehicle-relations.dto';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {
    constructor(
        private _imagesService: ImagesService,
        private _relationsService: RelationsService,
        private _repoWrapper: RepositoryWrapper
    ) {}

    findByPage(page: number, count: number): Promise<PaginationResult<Vehicle>> {
        return this._repoWrapper.vehicles.findByPage(page, count);
    }

    findOne(id: number): Promise<Vehicle> {
        const vehicle = this._repoWrapper.vehicles.findOne({
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

    async exists(id: number): Promise<boolean> {
        const vehicle = await this._repoWrapper.vehicles.findOne({
            where: { id },
            select: ['id']
        });
        return !!vehicle;
    }

    async create(vehicle: Vehicle, images: Express.Multer.File[]): Promise<Vehicle> {
        const [publicImages, fileImages] = await Promise.all([
            this._imagesService.createPublicImages(images),
            this._imagesService.createFileImages(images)
        ]);
        vehicle.publicImages = publicImages;
        vehicle.fileImages = fileImages;
        return this._repoWrapper.vehicles.create(vehicle);
    }

    update(id: number, vehicle: Vehicle): Promise<Vehicle> {
        return this._repoWrapper.vehicles.update(id, vehicle);
    }

    async remove(vehicle: Vehicle): Promise<Vehicle> {
        await Promise.all([
            this._imagesService.deletePublicImages(vehicle.publicImages),
            this._imagesService.deleteFileImages(vehicle.fileImages)
        ]);
        return this._repoWrapper.vehicles.remove(vehicle);
    }

    async addImages(vehicle: Vehicle, images: Express.Multer.File[]): Promise<Vehicle> {
        const [publicImages, fileImages] = await Promise.all([
            this._imagesService.createPublicImages(images),
            this._imagesService.createFileImages(images)
        ]);
        vehicle.publicImages.push(...publicImages);
        vehicle.fileImages.push(...fileImages);
        return await this._repoWrapper.vehicles.save(vehicle);
    }
    async addRelations(vehicle: Vehicle, relations: VehicleRelations): Promise<Vehicle> {
        const updatedVehicle = await this._relationsService.addRelations(vehicle, {...relations});
        return this._repoWrapper.vehicles.save(updatedVehicle);
    }

    async removeRelations(vehicle: Vehicle, relations: VehicleRelations): Promise<Vehicle> {
        const updatedVehicle = await this._relationsService.removeRelations(vehicle, {...relations});
        return this._repoWrapper.vehicles.save(updatedVehicle);
    }
}
