import { BaseRepository } from "src/repository/repository.realization";
import { DataSource } from "typeorm";
import { PublicImage } from "../entities/public-image.entity";

export class PublicImagesRepository extends BaseRepository<PublicImage> {
    constructor(ds: DataSource) {
        super(ds, PublicImage)
    }
}