import { ApiProperty } from '@nestjs/swagger';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileImage implements EntityInterface {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'HIMARS.png' })
  @Column({ name: 'file_name' })
  fileName: string;
}
