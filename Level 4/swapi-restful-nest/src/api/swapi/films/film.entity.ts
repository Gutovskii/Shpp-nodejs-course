import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../people/person.entity";
import { Planet } from "../planets/planet.entity";
import { Species } from "../species/species.entity";
import { Starship } from "../starships/starship.entity";
import { Vehicle } from "../vehicles/vehicle.entity";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { AutoMap } from "@automapper/classes";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";

@Entity()
export class Film implements EntityInterface {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    title: string

    @AutoMap()
    @Column({name: 'episode_id', type: 'int'})
    episodeId: number

    @AutoMap()
    @Column({name: 'opening_crawl'})
    openingCrawl: string

    @AutoMap()
    @Column()
    director: string

    @AutoMap()
    @Column()
    producer: string

    @AutoMap()
    @Column({name: 'release_date'})
    releaseDate: number

    @ManyToMany(() => Person, character => character.films, {eager: true})
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'character_id'}})
    characters: Person[]

    @ManyToMany(() => Planet, planet => planet.films, {eager: true})
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'planet_id'}})
    planets: Planet[]

    @ManyToMany(() => Starship, starship => starship.films, {eager: true})
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'starship_id'}})
    starships: Starship[]

    @ManyToMany(() => Vehicle, vehicle => vehicle.films, {eager: true})
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'vehicle_id'}})
    vehicles: Vehicle[]

    @ManyToMany(() => Species, species => species.films, {eager: true})
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'species_id'}})
    species: Species[]

    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages: PublicImage[]
    
    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'film_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages: FileImage[]
}