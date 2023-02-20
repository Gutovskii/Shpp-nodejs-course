import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { Planet } from './planet.entity';

export class PlanetsRepository extends BaseRepository<Planet> {
  constructor(ds: DataSource) {
    super(ds, Planet);
  }
}
