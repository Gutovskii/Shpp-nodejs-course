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
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { FileImage } from 'src/api/images/entities/file-image.entity';
import { PublicImage } from 'src/api/images/entities/public-image.entity';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { Film } from '../films/film.entity';
import { Person } from '../people/person.entity';
import { Planet } from '../planets/planet.entity';

@Entity()
export class Species implements EntityInterface {
  @ApiProperty({ example: 1 })
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Human' })
  @AutoMap()
  @Column()
  name: string;

  @ApiProperty({ example: 'mammal' })
  @AutoMap()
  @Column()
  classification: string;

  @ApiProperty({ example: 'sentient' })
  @AutoMap()
  @Column()
  designation: string;

  @ApiProperty({ example: '180' })
  @AutoMap()
  @Column({ name: 'average_height' })
  averageHeight: string;

  @ApiProperty({ example: '120' })
  @AutoMap()
  @Column({ name: 'average_lifespan' })
  averageLifespan: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  @AutoMap()
  @Column({ name: 'eye_colors' })
  eyeColors: string;

  @ApiProperty({ example: 'blonde, brown, black, red' })
  @AutoMap()
  @Column({ name: 'hair_colors' })
  hairColors: string;

  @ApiProperty({ example: 'Galactic Basic' })
  @AutoMap()
  @Column()
  language: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiProperty({ type: () => Planet })
  @ManyToOne(() => Planet, (planet) => planet.species, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld?: Planet;

  @ApiProperty({ type: () => Person, isArray: true })
  @ManyToMany(() => Person, (person) => person.species)
  people?: Person[];

  @ApiProperty({ type: () => Film, isArray: true })
  @ManyToMany(() => Film, (film) => film.species)
  films?: Film[];

  @ApiProperty({ type: () => PublicImage, isArray: true })
  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'species_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  publicImages?: PublicImage[];

  @ApiProperty({ type: () => FileImage, isArray: true })
  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'species_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  fileImages?: FileImage[];
}
