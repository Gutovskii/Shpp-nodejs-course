import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { FileImage } from 'src/api/images/entities/file-image.entity';
import { PublicImage } from 'src/api/images/entities/public-image.entity';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { Film } from '../films/film.entity';
import { Planet } from '../planets/planet.entity';
import { Species } from '../species/species.entity';
import { Starship } from '../starships/starship.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity()
export class Person implements EntityInterface {
  @ApiProperty({ example: 1 })
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Luke Skywalker' })
  @AutoMap()
  @Column()
  name: string;

  @ApiProperty({ example: '19BBY' })
  @AutoMap()
  @Column({ name: 'birth_year' })
  birthYear: string;

  @ApiProperty({ example: 'male' })
  @AutoMap()
  @Column()
  gender: string;

  @ApiProperty({ example: '172' })
  @AutoMap()
  @Column({ type: 'double' })
  height: string;

  @ApiProperty({ example: '77' })
  @AutoMap()
  @Column({ type: 'double' })
  mass: string;

  @ApiProperty({ example: 'blue' })
  @AutoMap()
  @Column({ name: 'eye_color' })
  eyeColor: string;

  @ApiProperty({ example: 'blond' })
  @AutoMap()
  @Column({ name: 'hair_color' })
  hairColor: string;

  @ApiProperty({ example: 'fair' })
  @AutoMap()
  @Column({ name: 'skin_color' })
  skinColor: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiProperty({ type: () => Planet })
  @ManyToOne(() => Planet, (planet) => planet.residents, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld?: Planet;

  @ApiProperty({ type: () => Film, isArray: true })
  @ManyToMany(() => Film, (film) => film.characters)
  films?: Film[];

  @ApiProperty({ type: () => Starship, isArray: true })
  @ManyToMany(() => Starship, (starship) => starship.pilots, { eager: true })
  starships?: Starship[];

  @ApiProperty({ type: () => Vehicle, isArray: true })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots, { eager: true })
  vehicles?: Vehicle[];

  @ApiProperty({ type: () => Vehicle, isArray: true })
  @ManyToMany(() => Species, (species) => species.people, { eager: true })
  @JoinTable({
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  species?: Species[];

  @ApiProperty({ type: () => PublicImage, isArray: true })
  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  publicImages?: PublicImage[];

  @ApiProperty({ type: () => FileImage, isArray: true })
  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  fileImages?: FileImage[];
}
