import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe,
  Query,
  NotFoundException,
  UseInterceptors,
  Put,
  ValidationPipe,
  UploadedFiles,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './starship.entity';
import {
  imageMulterOptions,
  IMAGES_MAX_COUNT,
} from 'src/api/images/image-multer-options';
import { StarshipRelations } from './dto/starship-relations.dto';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';
import { ApiPaginationResult } from 'src/common/docs/pagination-result.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

@Controller('starship')
@ApiTags('starship')
@ApiExtraModels(Starship)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class StarshipsController {
  constructor(
    @InjectMapper() private _mapper: Mapper,
    private _starshipsService: StarshipsService,
  ) {}

  @Get()
  @ApiPaginationResult(Starship)
  @UsePipes(ParseIntPipe)
  @RolesAccess(Roles.USER)
  async getStarshipsByPage(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this._starshipsService.findByPage(page, count);
  }

  @Get(':id')
  @ApiResponseData(Starship)
  @RolesAccess(Roles.USER)
  async getStarshipById(@Param('id', ParseIntPipe) id: number) {
    const starship = await this._starshipsService.findOne(id);
    if (!starship) throw new NotFoundException();
    return starship;
  }

  @Post()
  @ApiResponseData(Starship, HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async createStarship(
    @Body(ValidationPipe) dto: CreateStarshipDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const starshipToCreate = await this._mapper.mapAsync(
      dto,
      CreateStarshipDto,
      Starship,
    );
    return this._starshipsService.create(starshipToCreate, images);
  }

  @Put(':id')
  @ApiResponseData(Starship)
  async updateStarship(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateStarshipDto,
  ) {
    const exists = await this._starshipsService.exists(id);
    if (!exists) throw new NotFoundException();
    const starshipToUpdate = await this._mapper.mapAsync(
      dto,
      UpdateStarshipDto,
      Starship,
    );
    return this._starshipsService.update(id, starshipToUpdate);
  }

  @Delete(':id')
  @ApiResponseData(Starship)
  async removeStarship(@Param('id', ParseIntPipe) id: number) {
    const starshipToDelete = await this._starshipsService.findOne(id);
    if (!starshipToDelete) throw new NotFoundException();
    return this._starshipsService.remove(starshipToDelete);
  }

  @Post('add-images/:id')
  @ApiResponseData(Starship)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const starship = await this._starshipsService.findOne(id);
    if (!starship) throw new NotFoundException();
    return this._starshipsService.addImages(starship, images);
  }

  @Put('add-relations/:id')
  @ApiResponseData(Starship)
  async addRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: StarshipRelations,
  ) {
    const starshipToUpdate = await this._starshipsService.findOne(id);
    if (!starshipToUpdate) throw new NotFoundException();
    return this._starshipsService.addRelations(starshipToUpdate, {
      ...relations,
    });
  }

  @Delete('remove-relations/:id')
  @ApiResponseData(Starship)
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: StarshipRelations,
  ) {
    const starshipToUpdate = await this._starshipsService.findOne(id);
    if (!starshipToUpdate) throw new NotFoundException();
    return this._starshipsService.removeRelations(starshipToUpdate, {
      ...relations,
    });
  }
}
