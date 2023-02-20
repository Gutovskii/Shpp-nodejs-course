import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { Starship } from './starship.entity';

export class StarshipsRepository extends BaseRepository<Starship> {
  constructor(ds: DataSource) {
    super(ds, Starship);
  }
}
