import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { Species } from './species.entity';

export class SpeciesRepository extends BaseRepository<Species> {
  constructor(ds: DataSource) {
    super(ds, Species);
  }
}
