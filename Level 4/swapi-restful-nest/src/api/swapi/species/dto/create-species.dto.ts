import { AutoMap } from "@automapper/classes"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateSpeciesDto {
    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly classification: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly designation: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly averageHeight: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly averageLifespan: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly eyeColors: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly hairColors: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly language: string

    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    readonly images: Express.Multer.File[]
}
