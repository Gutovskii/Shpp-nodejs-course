import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/film.entity";
import { Person } from "../people/person.entity";
import { Planet } from "../planets/planet.entity";
import { FileImage } from "src/api/images/entities/file-image.entity";
import { AutoMap } from "@automapper/classes";
import { PublicImage } from "src/api/images/entities/public-image.entity";
import { EntityInterface } from "src/common/interfaces/entity.interface";

@Entity()
export class Species implements EntityInterface {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    name: string

    @AutoMap()
    @Column()
    classification: string

    @AutoMap()
    @Column()
    designation: string

    @AutoMap()
    @Column({name: 'average_height'})
    averageHeight: string

    @AutoMap()
    @Column({name: 'average_lifespan'})
    averageLifespan: string

    @AutoMap()
    @Column({name: 'eye_colors'})
    eyeColors: string

    @AutoMap()
    @Column({name: 'hair_colors'})
    hairColors: string

    @AutoMap()
    @Column()
    language: string

    @ManyToOne(() => Planet, planet => planet.species, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'homeworld_id'})
    homeworld: Planet

    @ManyToMany(() => Person, person => person.species)
    people: Person[]

    @ManyToMany(() => Film, film => film.species)
    films: Film[]

    @ManyToMany(() => PublicImage)
    @JoinTable({joinColumn: {name: 'species_id'}, inverseJoinColumn: {name: 'public_image_id'}})
    publicImages: PublicImage[]

    @ManyToMany(() => FileImage)
    @JoinTable({joinColumn: {name: 'species_id'}, inverseJoinColumn: {name: 'file_image_id'}})
    fileImages: FileImage[]
}
