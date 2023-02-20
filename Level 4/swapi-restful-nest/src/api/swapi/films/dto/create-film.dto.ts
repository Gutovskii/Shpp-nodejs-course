import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  readonly episodeId: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly openingCrawl: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly director: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly producer: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly releaseDate: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}
