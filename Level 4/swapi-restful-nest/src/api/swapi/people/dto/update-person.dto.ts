import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePersonDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly birthYear: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly height: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly mass: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly eyeColor: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hairColor: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly skinColor: string;
}
