import { ApiProperty } from "@nestjs/swagger";
import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role implements EntityInterface {
    @ApiProperty({example: 1})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'ADMIN'})
    @Column()
    name: string
}
