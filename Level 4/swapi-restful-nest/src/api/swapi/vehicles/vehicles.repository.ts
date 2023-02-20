import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export class VehiclesRepository extends BaseRepository<Vehicle> {
  constructor(ds: DataSource) {
    super(ds, Vehicle);
  }
}
