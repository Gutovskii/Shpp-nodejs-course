import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { Film } from './film.entity';

export class FilmsRepository extends BaseRepository<Film> {
  constructor(ds: DataSource) {
    super(ds, Film);
  }
}
