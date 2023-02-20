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
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './planet.entity';
import {
  imageMulterOptions,
  IMAGES_MAX_COUNT,
} from 'src/api/images/image-multer-options';
import { PlanetRelations } from './dto/planet-relations.dto';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';
import { ApiPaginationResult } from 'src/common/docs/pagination-result.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

@Controller('planets')
@ApiTags('planets')
@ApiExtraModels(Planet)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlanetsController {
  constructor(
    @InjectMapper() private _mapper: Mapper,
    private _planetsService: PlanetsService,
  ) {}

  @Get()
  @ApiPaginationResult(Planet)
  @UsePipes(ParseIntPipe)
  @RolesAccess(Roles.USER)
  async getPeopleByPage(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this._planetsService.findByPage(page, count);
  }

  @Get(':id')
  @ApiResponseData(Planet)
  @RolesAccess(Roles.USER)
  async getPersonById(@Param('id', ParseIntPipe) id: number) {
    const planet = await this._planetsService.findOne(id);
    if (!planet) throw new NotFoundException();
    return planet;
  }

  @Post()
  @ApiResponseData(Planet, HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async createPerson(
    @Body(ValidationPipe) dto: CreatePlanetDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const planetToCreate = await this._mapper.mapAsync(
      dto,
      CreatePlanetDto,
      Planet,
    );
    return this._planetsService.create(planetToCreate, images);
  }

  @Put(':id')
  @ApiResponseData(Planet)
  async updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePlanetDto,
  ) {
    const exists = await this._planetsService.exists(id);
    if (!exists) throw new NotFoundException();
    const planetToUpdate = await this._mapper.mapAsync(
      dto,
      UpdatePlanetDto,
      Planet,
    );
    return this._planetsService.update(id, planetToUpdate);
  }

  @Delete(':id')
  @ApiResponseData(Planet)
  async removePerson(@Param('id', ParseIntPipe) id: number) {
    const planetToDelete = await this._planetsService.findOne(id);
    if (!planetToDelete) throw new NotFoundException();
    return this._planetsService.remove(planetToDelete);
  }

  @Post('add-images/:id')
  @ApiResponseData(Planet)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const planet = await this._planetsService.findOne(id);
    if (!planet) throw new NotFoundException();
    return this._planetsService.addImages(planet, images);
  }

  @Put('add-relations/:id')
  @ApiResponseData(Planet)
  async addRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PlanetRelations,
  ) {
    const planetToUpdate = await this._planetsService.findOne(id);
    if (!planetToUpdate) throw new NotFoundException();
    return this._planetsService.addRelations(planetToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  @ApiResponseData(Planet)
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PlanetRelations,
  ) {
    const planetToUpdate = await this._planetsService.findOne(id);
    if (!planetToUpdate) throw new NotFoundException();
    return this._planetsService.removeRelations(planetToUpdate, {
      ...relations,
    });
  }
}
