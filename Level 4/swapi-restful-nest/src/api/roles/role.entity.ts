import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
