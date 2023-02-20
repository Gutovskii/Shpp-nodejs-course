import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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
import { Person } from '../people/person.entity';
import { Species } from '../species/species.entity';

@Entity()
export class Planet implements EntityInterface {
  @ApiProperty({ example: 1 })
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Tatooine' })
  @AutoMap()
  @Column()
  name: string;

  @ApiProperty({ example: '10465' })
  @AutoMap()
  @Column()
  diameter: string;

  @ApiProperty({ example: '23' })
  @AutoMap()
  @Column({ name: 'rotation_period' })
  rotationPeriod: string;

  @ApiProperty({ example: '304' })
  @AutoMap()
  @Column({ name: 'orbital_period' })
  orbitalPeriod: string;

  @ApiProperty({ example: '1 standard' })
  @AutoMap()
  @Column()
  gravity: string;

  @ApiProperty({ example: '200000' })
  @AutoMap()
  @Column()
  population: string;

  @ApiProperty({ example: 'arid' })
  @AutoMap()
  @Column()
  climate: string;

  @ApiProperty({ example: 'desert' })
  @AutoMap()
  @Column()
  terrain: string;

  @ApiProperty({ example: '1' })
  @AutoMap()
  @Column({ name: 'surface_water' })
  surfaceWater: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiProperty({ type: () => Person, isArray: true })
  @OneToMany(() => Person, (person) => person.homeworld, { eager: true })
  residents?: Person[];

  @ApiProperty({ type: () => Species, isArray: true })
  @OneToMany(() => Species, (species) => species.homeworld, { eager: true })
  species?: Species[];

  @ApiProperty({ type: () => Film, isArray: true })
  @ManyToMany(() => Film, (film) => film.planets)
  films?: Film[];

  @ApiProperty({ type: () => PublicImage, isArray: true })
  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'planet_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  publicImages?: PublicImage[];

  @ApiProperty({ type: () => FileImage, isArray: true })
  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'planet_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  fileImages?: FileImage[];
}
