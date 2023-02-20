import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStarshipDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly starshipClass: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly manufacturer: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly costInCredits: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly length: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly crew: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly passengers: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly maxAtmospheringSpeed: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly mglt: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hyperdriveRating: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly cargoCapacity: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly consumables: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}
