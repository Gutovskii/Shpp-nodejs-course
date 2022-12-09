import { EntityInterface } from "src/common/interfaces/entity.interface";
import { FindManyOptions, FindOneOptions } from "typeorm";

export interface RepositoryInterface<T extends EntityInterface> {
    find(options: FindManyOptions<T>): Promise<T[]>;
    findByPage(page: number, count: number): Promise<{partOfEntities: T[], totalCount: number}>;
    findOne(options: FindOneOptions<T>): Promise<T>;
    create(entity: T): Promise<T>;
    createMany(entities: T[]): Promise<T[]>;
    update(id: number, entity: T): Promise<T>;
    updateMany(entities: T[]): Promise<T[]>;
    remove(entityToRemove: T): Promise<T>;
    removeMany(entitiesToRemove: T[]): Promise<T[]>;
    save(entity: T): Promise<T>;
}