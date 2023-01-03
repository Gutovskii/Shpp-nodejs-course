import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';
import { S3 } from 'aws-sdk';
import { CommonEnum } from 'src/common/common.enum';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { PublicImage } from './entities/public-image.entity';
import { FileImage } from './entities/file-image.entity';
import { In } from 'typeorm';

@Injectable()
export class ImagesService {
    private readonly s3 = new S3();

    constructor(
        private _repoWrapper: RepositoryWrapper,
        private _configService: ConfigService
    ) {}

    async createPublicImages(images: Express.Multer.File[]): Promise<PublicImage[]> {
        if (!images) return [];
        
        const uploadedResultsPromises = images.map(publicImage =>
            this.s3.upload({
                Bucket: this._configService.get('aws.publicBucketName'),
                Body: publicImage.buffer,
                Key: `${uuid.v4() + path.extname(publicImage.originalname)}`
            }).promise()
        );
        const uploadedResults = await Promise.all(uploadedResultsPromises);

        const publicImagesToCreate = uploadedResults.map(uploadedResult => {
            const publicImage = new PublicImage();
            publicImage.key = uploadedResult.Key,
            publicImage.url = uploadedResult.Location
            return publicImage;
        });
        
        return this._repoWrapper.publicImages.createMany(publicImagesToCreate);
    }

    async deletePublicImages(images: PublicImage[]): Promise<void> {
        const deletedResultsPromises = images.map(publicImage => 
            this.s3.deleteObject({
                Bucket: this._configService.get('aws.publicBucketName'),
                Key: publicImage.key
            }).promise()
        );
        await Promise.all(deletedResultsPromises);
        await this._repoWrapper.publicImages.removeMany(images);
    }

    async createFileImages(images: Express.Multer.File[]): Promise<FileImage[]> {
        if (!images) return [];

        await fs.mkdir(CommonEnum.FILES_IMAGES_PATH, {recursive: true});

        const fileImagesToCreate: FileImage[] = [];
        const createFilesPromises = images.map(image => {
            const fileName = uuid.v4() + path.extname(image.originalname);
            const fileImage = new FileImage();
            fileImage.fileName = fileName;
            fileImagesToCreate.push(fileImage);
            return fs.writeFile(path.join(CommonEnum.FILES_IMAGES_PATH, fileName), image.buffer);
        });
        await Promise.all(createFilesPromises);

        return this._repoWrapper.fileImages.createMany(fileImagesToCreate);
    }

    async deleteFileImages(images: FileImage[]): Promise<void> {
        const deleteFilesPromises = images.map(image => 
            fs.unlink(path.join(CommonEnum.FILES_IMAGES_PATH, image.fileName))
        );
        await Promise.all(deleteFilesPromises);
        await this._repoWrapper.fileImages.removeMany(images);
    }

    async deleteImagesByIds(ids: number[]): Promise<void> {
        const [publicImagesToDelete, fileImagesToDelete] = await Promise.all([
            this._repoWrapper.publicImages.find({where: {id: In(ids)}}),
            this._repoWrapper.fileImages.find({where: {id: In(ids)}})
        ]);
        await this.deletePublicImages(publicImagesToDelete);
        await this.deleteFileImages(fileImagesToDelete);
    }
}
