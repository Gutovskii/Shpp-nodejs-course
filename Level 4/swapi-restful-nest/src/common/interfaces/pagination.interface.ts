import { EntityInterface } from "./entity.interface"

export interface PaginationResult<T extends EntityInterface> {
    partOfEntities: T[]
    totalCount: number
}