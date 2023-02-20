import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { FileImage } from 'src/api/images/entities/file-image.entity';
import { PublicImage } from 'src/api/images/entities/public-image.entity';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { Person } from '../people/person.entity';
import { Planet } from '../planets/planet.entity';
import { Species } from '../species/species.entity';
import { Starship } from '../starships/starship.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity()
export class Film implements EntityInterface {
  @ApiProperty({ example: 1 })
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'A New Hope' })
  @AutoMap()
  @Column()
  title: string;

  @ApiProperty({ example: 4 })
  @AutoMap()
  @Column({ name: 'episode_id', type: 'int' })
  episodeId: number;

  @ApiProperty({ example: 'It is a period of civil war' })
  @AutoMap()
  @Column({ name: 'opening_crawl' })
  openingCrawl: string;

  @ApiProperty({ example: 'George Lucas' })
  @AutoMap()
  @Column()
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @AutoMap()
  @Column()
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @AutoMap()
  @Column({ name: 'release_date' })
  releaseDate: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiProperty({ type: () => Person, isArray: true })
  @ManyToMany(() => Person, (character) => character.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'character_id' },
  })
  characters?: Person[];

  @ApiProperty({ type: () => Planet, isArray: true })
  @ManyToMany(() => Planet, (planet) => planet.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'planet_id' },
  })
  planets?: Planet[];

  @ApiProperty({ type: () => Starship, isArray: true })
  @ManyToMany(() => Starship, (starship) => starship.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'starship_id' },
  })
  starships?: Starship[];

  @ApiProperty({ type: () => Vehicle, isArray: true })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'vehicle_id' },
  })
  vehicles?: Vehicle[];

  @ApiProperty({ type: () => Species, isArray: true })
  @ManyToMany(() => Species, (species) => species.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  species?: Species[];

  @ApiProperty({ type: () => PublicImage, isArray: true })
  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  publicImages?: PublicImage[];

  @ApiProperty({ type: () => FileImage, isArray: true })
  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  fileImages?: FileImage[];
}
