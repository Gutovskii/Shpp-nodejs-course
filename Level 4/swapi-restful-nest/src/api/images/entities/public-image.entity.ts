import { ApiProperty } from '@nestjs/swagger';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PublicImage implements EntityInterface {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'https://bucket-name.s3.eu-north-1.amazonaws.com/HIMARS.png',
  })
  @Column()
  url: string;

  @ApiProperty({ example: 'HIMARS.png' })
  @Column()
  key: string;
}
