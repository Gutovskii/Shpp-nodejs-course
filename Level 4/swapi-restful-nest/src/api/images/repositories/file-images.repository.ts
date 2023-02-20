import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { FileImage } from '../entities/file-image.entity';

export class FileImagesRepository extends BaseRepository<FileImage> {
  constructor(ds: DataSource) {
    super(ds, FileImage);
  }
}
