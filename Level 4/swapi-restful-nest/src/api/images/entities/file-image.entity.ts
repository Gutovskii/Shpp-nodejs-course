import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileImage implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'file_name'})
    fileName: string
}
