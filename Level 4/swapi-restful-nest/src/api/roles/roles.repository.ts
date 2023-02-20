import { BaseRepository } from 'src/repository/repository.realization';
import { DataSource } from 'typeorm';
import { Role } from './role.entity';

export class RolesRepository extends BaseRepository<Role> {
  constructor(ds: DataSource) {
    super(ds, Role);
  }
}
