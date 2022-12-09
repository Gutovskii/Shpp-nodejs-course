import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/film.entity";
import { Person } from "../people/person.entity";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { AutoMap } from "@automapper/classes";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";

@Entity()
export class Vehicle implements EntityInterface {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    name: string

    @AutoMap()
    @Column()
    model: string

    @AutoMap()
    @Column({name: 'vehicle_class'})
    vehicleClass: string

    @AutoMap()
    @Column()
    manufacturer: string
    
    @AutoMap()
    @Column()
    length: string

    @AutoMap()
    @Column({name: 'cost_in_credits'})
    costInCredits: string

    @AutoMap()
    @Column()
    crew: string

    @AutoMap()
    @Column()
    passengers: string

    @AutoMap()
    @Column({name: 'max_atmospering_speed'})
    maxAtmospheringSpeed: string

    @AutoMap()
    @Column({name: 'cargo_capacity'})
    cargoCapacity: string

    @AutoMap()
    @Column()
    consumables: string

    @ManyToMany(() => Film, film => film.vehicles)
    films: Film[]

    @ManyToMany(() => Person, pilot => pilot.vehicles)
    @JoinTable({joinColumn: {name: 'vehicle_id'}, inverseJoinColumn: {name: 'pilot_id'}})
    pilots: Person[]

    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'vehicle_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages: PublicImage[]

    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'vehicle_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages: FileImage[]
}
