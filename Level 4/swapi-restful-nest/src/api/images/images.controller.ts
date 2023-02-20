import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { DeleteImagesDto } from 'src/api/images/dto/delete-images.dto';
import { RolesAccess } from '../auth/decorators/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { FileImage } from './entities/file-image.entity';
import { PublicImage } from './entities/public-image.entity';
import { ImagesService } from './images.service';

@Controller('images')
@ApiTags('images')
@ApiExtraModels(PublicImage, FileImage)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImagesController {
  constructor(private readonly _imagesService: ImagesService) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImagesByIds(@Body(ValidationPipe) dto: DeleteImagesDto) {
    await this._imagesService.deleteImagesByIds(dto.imagesIds);
  }
}
