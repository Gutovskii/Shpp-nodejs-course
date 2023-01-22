import { ApiProperty } from "@nestjs/swagger";
import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/role.entity";

@Entity()
export class User implements EntityInterface {
    @ApiProperty({example: 1})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Himars'})
    @Column()
    username: string

    @ApiProperty({example: '$2a$10$2GjEAsQ4k4RJlf6z1Wf94eAEppkDjTq/G/jk.E/7jXtkwLyRgZlu'})
    @Column({name: 'hash_password'})
    hashPassword: string

    @ApiProperty({type: () => Role, isArray: true})
    @JoinTable({joinColumn: {name: 'user_id'}, inverseJoinColumn: {name: 'role_id'}})
    @ManyToMany(() => Role)
    roles?: Role[]
}
