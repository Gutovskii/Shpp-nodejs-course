import { DataSource, EntityTarget, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { EntityInterface } from "src/common/interfaces/entity.interface";
import { PaginationResult } from "src/common/interfaces/pagination.interface";
import { RepositoryInterface } from "./repository.interface";

export class BaseRepository<T extends EntityInterface> implements RepositoryInterface<T> {
    private _repository: Repository<T>;
    
    constructor(ds: DataSource, entity: EntityTarget<T>) {
        this._repository = ds.getRepository(entity);
    }

    async find(options: FindManyOptions<T>) {
        return await this._repository.find(options);
    }
    
    async findByPage(page: number, count: number): Promise<PaginationResult<T>> {
        const [partOfEntities, totalCount] = await this._repository.findAndCount({
            skip: (page - 1) * count,
            take: count,
            loadEagerRelations: false
        });
        return {
            partOfEntities,
            totalCount
        }
    }

    async findOne(options: FindOneOptions<T>): Promise<T> {
        return await this._repository.findOne(options);
    }
    
    async create(entity: T): Promise<T> {
        return await this._repository.save(entity);
    }
    
    async createMany(entities: T[]): Promise<T[]> {
        return await this._repository.save(entities);
    }

    async update(id: number, entity: T): Promise<T> {
        return await this._repository.save({...entity, id});
    }
    
    async updateMany(entities: T[]): Promise<T[]> {
        return await this._repository.save(entities);
    }

    async remove(entityToRemove: T): Promise<T> {
        return await this._repository.remove(entityToRemove);
    }

    async removeMany(entitiesToRemove: T[]): Promise<T[]> {
        return await this._repository.remove(entitiesToRemove);
    }

    async save(entity: T): Promise<T> {
        return await this._repository.save(entity);
    }
}
