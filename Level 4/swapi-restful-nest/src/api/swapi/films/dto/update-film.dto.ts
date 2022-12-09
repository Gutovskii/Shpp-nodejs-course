import { AutoMap } from "@automapper/classes"
import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class UpdateFilmDto {
    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsInt()
    readonly episodeId: number

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly openingCrawl: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly director: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly producer: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly releaseDate: string
}