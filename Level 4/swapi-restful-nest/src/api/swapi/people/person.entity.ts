import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/film.entity";
import { Planet } from "../planets/planet.entity";
import { Species } from "../species/species.entity";
import { Starship } from "../starships/starship.entity";
import { Vehicle } from "../vehicles/vehicle.entity";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";

@Entity()
export class Person implements EntityInterface {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    name: string

    @AutoMap()
    @Column({name: 'birth_year'})
    birthYear: string

    @AutoMap()
    @Column()
    gender: string

    @AutoMap()
    @Column({type: 'double'})
    height: string

    @AutoMap()
    @Column({type: 'double'})
    mass: string

    @AutoMap()
    @Column({name: 'eye_color'})
    eyeColor: string

    @AutoMap()
    @Column({name: 'hair_color'})
    hairColor: string

    @AutoMap()
    @Column({name: 'skin_color'})
    skinColor: string

    @ManyToOne(() => Planet, planet => planet.residents, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'homeworld_id'})
    homeworld: Planet
    
    @ManyToMany(() => Film, film => film.characters)
    films: Film[]
    
    @ManyToMany(() => Starship, starship => starship.pilots, {eager: true})
    starships: Starship[]

    @ManyToMany(() => Vehicle, vehicle => vehicle.pilots, {eager: true})
    vehicles: Vehicle[]

    @ManyToMany(() => Species, species => species.people, {eager: true})
    @JoinTable({joinColumn: {name: 'person_id'}, inverseJoinColumn: {name: 'species_id'}})
    species: Species[]

    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'person_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages: PublicImage[]

    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'person_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages: FileImage[]
}