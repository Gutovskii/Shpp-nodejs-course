import { Controller, Get, Post, Body, Param, Delete, UsePipes, ParseIntPipe, Query, NotFoundException, UseInterceptors, Put, ValidationPipe, UploadedFiles, UseGuards, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Species } from './species.entity';
import { imageMulterOptions, IMAGES_MAX_COUNT } from 'src/api/images/image-multer-options';
import { SpeciesRelations } from './dto/species-relations.dto';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';
import { ApiPaginationResult } from 'src/common/docs/pagination-result.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

@Controller('species')
@ApiTags('species')
@ApiExtraModels(Species)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpeciesController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _speciesService: SpeciesService
    ) {}

    @Get()
    @ApiPaginationResult(Species)
    @UsePipes(ParseIntPipe)
    @RolesAccess(Roles.USER)
    async getSpeciesByPage(@Query('page') page: number, @Query('count') count: number) {
        return this._speciesService.findByPage(page, count);
    }

    @Get(':id')
	@ApiResponseData(Species)
    @RolesAccess(Roles.USER)
    async getSpeciesById(@Param('id', ParseIntPipe) id: number) {
        const species = await this._speciesService.findOne(id);
        if (!species) throw new NotFoundException();
        return species;    
    }

    @Post()
	@ApiResponseData(Species, HttpStatus.CREATED)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions))
    async createSpecies(@Body(ValidationPipe) dto: CreateSpeciesDto, @UploadedFiles() images: Express.Multer.File[]) {
        const speciesToCreate = await this._mapper.mapAsync(dto, CreateSpeciesDto, Species);
        return this._speciesService.create(speciesToCreate, images);
    }

    @Put(':id')
	@ApiResponseData(Species)
    async updateSpecies(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdateSpeciesDto) {
        const exists = await this._speciesService.exists(id);
        if (!exists) throw new NotFoundException();
        const speciesToUpdate = await this._mapper.mapAsync(dto, UpdateSpeciesDto, Species);
        return this._speciesService.update(id, speciesToUpdate);
    }

    @Delete(':id')
	@ApiResponseData(Species)
    async removeSpecies(@Param('id', ParseIntPipe) id: number) {
        const speciesToDelete = await this._speciesService.findOne(id);
        if (!speciesToDelete) throw new NotFoundException();
        return this._speciesService.remove(speciesToDelete);
    }

    @Post('add-images/:id')
	@ApiResponseData(Species)
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: AddImagesDto})
    @UseInterceptors(FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions))
    async addImages(@Param('id', ParseIntPipe) id: number, @UploadedFiles() images: Express.Multer.File[]) {
        const species = await this._speciesService.findOne(id);
        if (!species) throw new NotFoundException();
        return this._speciesService.addImages(species, images);
    }

    @Put('add-relations/:id')
	@ApiResponseData(Species)
    async addRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: SpeciesRelations) {
        const speciesToUpdate = await this._speciesService.findOne(id);
        if (!speciesToUpdate) throw new NotFoundException(); 
        return this._speciesService.addRelations(speciesToUpdate, {...relations});
    }

    @Delete('remove-relations/:id')
	@ApiResponseData(Species)
    async removeRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: SpeciesRelations) {
        const speciesToUpdate = await this._speciesService.findOne(id);
        if (!speciesToUpdate) throw new NotFoundException();
        return this._speciesService.removeRelations(speciesToUpdate, {...relations});
    }
}
