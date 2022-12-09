import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/role.entity";

@Entity()
export class User implements EntityInterface {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({name: 'hash_password'})
    hashPassword: string

    @JoinTable({joinColumn: {name: 'user_id'}, inverseJoinColumn: {name: 'role_id'}})
    @ManyToMany(() => Role)
    roles: Role[]
}
