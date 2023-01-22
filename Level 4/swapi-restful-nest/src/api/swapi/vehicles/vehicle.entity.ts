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
export class Vehicle implements EntityInterface {
    @ApiProperty({example: 1})
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Sand Crawler'})
    @AutoMap()
    @Column()
    name: string

    @ApiProperty({example: 'Digger Crawler'})
    @AutoMap()
    @Column()
    model: string

    @ApiProperty({example: 'wheeled'})
    @AutoMap()
    @Column({name: 'vehicle_class'})
    vehicleClass: string

    @ApiProperty({example: 'Corellia Mining Corporation'})
    @AutoMap()
    @Column()
    manufacturer: string
    
    @ApiProperty({example: '36.8'})
    @AutoMap()
    @Column()
    length: string

    @ApiProperty({example: '150000'})
    @AutoMap()
    @Column({name: 'cost_in_credits'})
    costInCredits: string

    @ApiProperty({example: '46'})
    @AutoMap()
    @Column()
    crew: string

    @ApiProperty({example: '30'})
    @AutoMap()
    @Column()
    passengers: string

    @ApiProperty({example: '30'})
    @AutoMap()
    @Column({name: 'max_atmospering_speed'})
    maxAtmospheringSpeed: string

    @ApiProperty({example: '50000'})
    @AutoMap()
    @Column({name: 'cargo_capacity'})
    cargoCapacity: string

    @ApiProperty({example: '2 months'})
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
    @ManyToMany(() => Film, film => film.vehicles)
    films?: Film[]

    @ApiProperty({type: () => Person, isArray: true})
    @ManyToMany(() => Person, pilot => pilot.vehicles)
    @JoinTable({joinColumn: {name: 'vehicle_id'}, inverseJoinColumn: {name: 'pilot_id'}})
    pilots?: Person[]

    @ApiProperty({type: () => PublicImage, isArray: true})
    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'vehicle_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages?: PublicImage[]

    @ApiProperty({type: () => FileImage, isArray: true})
    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'vehicle_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages?: FileImage[]
}
