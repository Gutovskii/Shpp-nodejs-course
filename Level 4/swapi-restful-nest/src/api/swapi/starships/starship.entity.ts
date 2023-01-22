import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { Exclude } from "class-transformer";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";
import { Film } from "../films/film.entity";
import { Person } from "../people/person.entity";

@Entity()
export class Starship implements EntityInterface {
    @ApiProperty({example: 1})
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'CR90 corvette'})
    @AutoMap()
    @Column()
    name: string

    @ApiProperty({example: 'CR90 corvette'})
    @AutoMap()
    @Column()
    model: string

    @ApiProperty({example: 'corvette'})
    @AutoMap()
    @Column({name: 'starship_class'})
    starshipClass: string

    @ApiProperty({example: 'Corellian Engineering Corporation'})
    @AutoMap()
    @Column()
    manufacturer: string

    @ApiProperty({example: '3500000'})
    @AutoMap()
    @Column({name: 'cost_in_credits'})
    costInCredits: string

    @ApiProperty({example: '150'})
    @AutoMap()
    @Column()
    length: string

    @ApiProperty({example: '30-165'})
    @AutoMap()
    @Column()
    crew: string

    @ApiProperty({example: '600'})
    @AutoMap()
    @Column()
    passengers: string

    @ApiProperty({example: '950'})
    @AutoMap()
    @Column({type: 'double', name: 'max_atmosphering_speed'})
    maxAtmospheringSpeed: string
    
    @ApiProperty({example: '60'})
    @AutoMap()
    @Column()
    mglt: string

    @ApiProperty({example: '2.0'})
    @AutoMap()
    @Column({name: 'hyperdrive_rating'})
    hyperdriveRating: string

    @ApiProperty({example: '3000000'})
    @AutoMap()
    @Column({name: 'cargo_capacity'})
    cargoCapacity: string

    @ApiProperty({example: '1 year'})
    @AutoMap()
    @Column()
    consumables: string

    @Exclude()
    @CreateDateColumn({type: 'timestamp'})
    created: Date

    @Exclude()
    @UpdateDateColumn({type: 'timestamp'})
    edited: Date

    @ApiProperty({type: () => Film, isArray: true})
    @ManyToMany(() => Film, film => film.starships)
    films?: Film[]

    @ApiProperty({type: () => Person, isArray: true})
    @ManyToMany(() => Person, pilot => pilot.starships)
    @JoinTable({joinColumn: {name: 'starship_id'}, inverseJoinColumn: {name: 'pilot_id'}})
    pilots?: Person[]

    @ApiProperty({type: () => PublicImage, isArray: true})
    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'starship_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages?: PublicImage[]

    @ApiProperty({type: () => FileImage, isArray: true})
    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'starship_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages?: FileImage[]
}
