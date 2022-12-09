import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PublicImage implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    key: string
}