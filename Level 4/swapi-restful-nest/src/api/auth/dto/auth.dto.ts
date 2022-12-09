import { ApiProperty } from "@nestjs/swagger"

export class AuthDto {
    @ApiProperty({required: true})
    username: string

    @ApiProperty({required: true})
    password: string
}