import { AutoMap } from "@automapper/classes"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePlanetDto {
    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly diameter: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly rotationPeriod: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly orbitalPeriod: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly gravity: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly population: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly climate: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly terrain: string

    @AutoMap()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly surfaceWater: string
    
    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    readonly images: Express.Multer.File[]
}
