import { Body, Controller, Delete, HttpCode, HttpStatus, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteImagesDto } from 'src/api/images/dto/delete-images.dto';
import { RolesAccess } from '../auth/decorators/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('images')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImagesController {
    constructor(
        private readonly _imagesService: ImagesService
    ) {}

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteImagesByIds(@Body(ValidationPipe) dto: DeleteImagesDto) {
        await this._imagesService.deleteImagesByIds(dto.imagesIds);
    }
}
