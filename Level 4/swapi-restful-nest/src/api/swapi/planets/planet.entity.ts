import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/film.entity";
import { Person } from "../people/person.entity";
import { Species } from "../species/species.entity";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { AutoMap } from "@automapper/classes";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";

@Entity()
export class Planet implements EntityInterface {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    name: string

    @AutoMap()
    @Column()
    diameter: string

    @AutoMap()
    @Column({name: 'rotation_period'})
    rotationPeriod: string

    @AutoMap()
    @Column({name: 'orbital_period'})
    orbitalPeriod: string

    @AutoMap()
    @Column()
    gravity: string

    @AutoMap()
    @Column()
    population: string

    @AutoMap()
    @Column()
    climate: string

    @AutoMap()
    @Column()
    terrain: string

    @AutoMap()
    @Column({name: 'surface_water'})
    surfaceWater: string

    @OneToMany(() => Person, person => person.homeworld, {eager: true})
    residents: Person[]

    @OneToMany(() => Species, species => species.homeworld, {eager: true})
    species: Species[]

    @ManyToMany(() => Film, film => film.planets)
    films: Film[]
    
    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'planet_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages: PublicImage[]

    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'planet_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages: FileImage[]
}
