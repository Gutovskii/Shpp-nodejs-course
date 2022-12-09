import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/film.entity";
import { Person } from "../people/person.entity";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { AutoMap } from "@automapper/classes";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";

@Entity()
export class Starship implements EntityInterface {
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
    @Column({name: 'starship_class'})
    starshipClass: string

    @AutoMap()
    @Column()
    manufacturer: string

    @AutoMap()
    @Column({name: 'cost_in_credits'})
    costInCredits: string

    @AutoMap()
    @Column()
    length: string

    @AutoMap()
    @Column()
    crew: string

    @AutoMap()
    @Column()
    passengers: string

    @AutoMap()
    @Column({type: 'double', name: 'max_atmosphering_speed'})
    maxAtmospheringSpeed: string
    
    @AutoMap()
    @Column()
    mglt: string

    @AutoMap()
    @Column({name: 'hyperdrive_rating'})
    hyperdriveRating: string

    @AutoMap()
    @Column({name: 'cargo_capacity'})
    cargoCapacity: string

    @AutoMap()
    @Column()
    consumables: string

    @ManyToMany(() => Film, film => film.starships)
    films: Film[]

    @ManyToMany(() => Person, pilot => pilot.starships)
    @JoinTable({joinColumn: {name: 'starship_id'}, inverseJoinColumn: {name: 'pilot_id'}})
    pilots: Person[]

    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'starship_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages: PublicImage[]

    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'starship_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages: FileImage[]
}
