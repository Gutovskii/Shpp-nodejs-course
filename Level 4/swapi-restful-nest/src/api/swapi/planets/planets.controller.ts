import { Controller, Get, Post, Body, Param, Delete, UsePipes, ParseIntPipe, Query, NotFoundException, UseInterceptors, Put, ValidationPipe, UploadedFiles, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './planet.entity';
import { imageMulterOptions } from 'src/api/images/image-multer-options';
import { PlanetRelations } from './dto/planet-relations.dto';
import { ImagesEnum } from 'src/api/images/images.types';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';

@ApiTags('planets')
@Controller('planets')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlanetsController {
	constructor(
		@InjectMapper() private _mapper: Mapper,
		private _planetsService: PlanetsService
	) {}
  
	@Get()
	@UsePipes(ParseIntPipe)
    @RolesAccess(Roles.USER)
	async getPeopleByPage(@Query('page') page: number, @Query('count') count: number) {
		const partOfPlanets = await this._planetsService.findByPage(page, count);
		return partOfPlanets;
	}

  	@Get(':id')
    @RolesAccess(Roles.USER)
	async getPersonById(@Param('id', ParseIntPipe) id: number) {
      	const planet = await this._planetsService.findOne(id);
      	if (!planet) throw new NotFoundException();
      	return planet;    
  	}

	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
	async createPerson(@Body(ValidationPipe) dto: CreatePlanetDto, @UploadedFiles() images: Express.Multer.File[]) {
		const planetToCreate = await this._mapper.mapAsync(dto, CreatePlanetDto, Planet);
		return await this._planetsService.create(planetToCreate, images);
	}

	@Put(':id')
	async updatePerson(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdatePlanetDto) {
		const planet = await this._planetsService.findOne(id);
		if (!planet) throw new NotFoundException();
		const planetToUpdate = await this._mapper.mapAsync(dto, UpdatePlanetDto, Planet);
		return await this._planetsService.update(id, planetToUpdate);
	}

	@Delete(':id')
	async removePerson(@Param('id', ParseIntPipe) id: number) {
		const planetToDelete = await this._planetsService.findOne(id);
		if (!planetToDelete) throw new NotFoundException();
		return await this._planetsService.remove(planetToDelete);
	}

    @Post('add-images/:id')
	@ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async addImages(@Param('id', ParseIntPipe) id: number, 
					@UploadedFiles() images: Express.Multer.File[],
					@Body(ValidationPipe) dto: AddImagesDto) {
        const planet = await this._planetsService.findOne(id);
        if (!planet) throw new NotFoundException();
        return await this._planetsService.addImages(planet, images);
    }

	@Put('add-relations/:id')
	async addRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: PlanetRelations) {
		const planetToUpdate = await this._planetsService.findOne(id);
		if (!planetToUpdate) throw new NotFoundException(); 
		return await this._planetsService.addRelations(planetToUpdate, {...relations});
	}

	@Delete('remove-relations/:id')
	async removeRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: PlanetRelations) {
		const planetToUpdate = await this._planetsService.findOne(id);
		if (!planetToUpdate) throw new NotFoundException();
		return await this._planetsService.removeRelations(planetToUpdate, {...relations});
	}
}
