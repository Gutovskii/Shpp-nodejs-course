import { AutoMap } from "@automapper/classes";
import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role implements EntityInterface {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    name: string
}
