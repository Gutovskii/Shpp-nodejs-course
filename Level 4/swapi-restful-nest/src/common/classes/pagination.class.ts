import { ApiProperty } from "@nestjs/swagger"
import { EntityInterface } from "../interfaces/entity.interface"
export class PaginationResult<T extends EntityInterface> {
    @ApiProperty({isArray: true})
    partOfEntities: T[]
    @ApiProperty()
    totalCount: number
}