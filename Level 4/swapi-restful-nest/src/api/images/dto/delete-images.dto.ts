import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional } from "class-validator";

export class DeleteImagesDto {
    @ApiProperty({type: [Number], required: false})
    @IsNumber({}, {each: true})
    @IsArray()
    @IsOptional()
    readonly imagesIds: number[]
}