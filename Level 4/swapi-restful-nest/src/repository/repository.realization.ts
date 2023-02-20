import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { RepositoryInterface } from './repository.interface';

export class BaseRepository<T extends EntityInterface>
  implements RepositoryInterface<T>
{
  private _repository: Repository<T>;

  constructor(ds: DataSource, entity: EntityTarget<T>) {
    this._repository = ds.getRepository(entity);
  }

  find(options: FindManyOptions<T>): Promise<T[]> {
    return this._repository.find(options);
  }

  async findByPage(page: number, count: number): Promise<PaginationResult<T>> {
    const [partOfEntities, totalCount] = await this._repository.findAndCount({
      skip: (page - 1) * count,
      take: count,
      loadEagerRelations: false,
    });
    return {
      partOfEntities,
      totalCount,
    };
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this._repository.findOne(options);
  }

  create(entity: T): Promise<T> {
    return this._repository.save(entity);
  }

  createMany(entities: T[]): Promise<T[]> {
    return this._repository.save(entities);
  }

  update(id: number, entity: T): Promise<T> {
    return this._repository.save({ ...entity, id });
  }

  updateMany(entities: T[]): Promise<T[]> {
    return this._repository.save(entities);
  }

  remove(entityToRemove: T): Promise<T> {
    return this._repository.remove(entityToRemove);
  }

  removeMany(entitiesToRemove: T[]): Promise<T[]> {
    return this._repository.remove(entitiesToRemove);
  }

  save(entity: T): Promise<T> {
    return this._repository.save(entity);
  }
}
