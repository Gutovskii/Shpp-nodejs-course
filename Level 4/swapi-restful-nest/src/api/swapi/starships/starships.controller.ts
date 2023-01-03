import { Controller, Get, Post, Body, Param, Delete, UsePipes, ParseIntPipe, Query, NotFoundException, UseInterceptors, Put, ValidationPipe, UploadedFiles, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './starship.entity';
import { imageMulterOptions } from 'src/api/images/image-multer-options';
import { StarshipRelations } from './dto/starship-relations.dto';
import { ImagesEnum } from 'src/api/images/images.types';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';

@ApiTags('starship')
@Controller('starship')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class StarshipsController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _starshipsService: StarshipsService
    ) {}
    
    @Get()
    @UsePipes(ParseIntPipe)
    @RolesAccess(Roles.USER)
    async getStarshipsByPage(@Query('page') page: number, @Query('count') count: number) {
        return this._starshipsService.findByPage(page, count);
    }

    @Get(':id')
    @RolesAccess(Roles.USER)
    async getStarshipById(@Param('id', ParseIntPipe) id: number) {
        const starship = await this._starshipsService.findOne(id);
        if (!starship) throw new NotFoundException();
        return starship;    
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async createStarship(@Body(ValidationPipe) dto: CreateStarshipDto, @UploadedFiles() images: Express.Multer.File[]) {
        const starshipToCreate = await this._mapper.mapAsync(dto, CreateStarshipDto, Starship);
        return this._starshipsService.create(starshipToCreate, images);
    }

    @Put(':id')
    async updateStarship(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdateStarshipDto) {
        const starship = await this._starshipsService.findOne(id);
        if (!starship) throw new NotFoundException();
        const starshipToUpdate = await this._mapper.mapAsync(dto, UpdateStarshipDto, Starship);
        return this._starshipsService.update(id, starshipToUpdate);
    }

    @Delete(':id')
    async removeStarship(@Param('id', ParseIntPipe) id: number) {
        const starshipToDelete = await this._starshipsService.findOne(id);
        if (!starshipToDelete) throw new NotFoundException();
        return this._starshipsService.remove(starshipToDelete);
    }

    @Post('add-images/:id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async addImages(@Param('id', ParseIntPipe) id: number, 
                          @UploadedFiles() images: Express.Multer.File[],
                          @Body(ValidationPipe) dto: AddImagesDto) {
        const starship = await this._starshipsService.findOne(id);
        if (!starship) throw new NotFoundException();
        return this._starshipsService.addImages(starship, images);
    }

    @Put('add-relations/:id')
    async addRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: StarshipRelations) {
        const starshipToUpdate = await this._starshipsService.findOne(id);
        if (!starshipToUpdate) throw new NotFoundException(); 
        return this._starshipsService.addRelations(starshipToUpdate, {...relations});
    }

    @Delete('remove-relations/:id')
    async removeRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: StarshipRelations) {
        const starshipToUpdate = await this._starshipsService.findOne(id);
        if (!starshipToUpdate) throw new NotFoundException();
        return this._starshipsService.removeRelations(starshipToUpdate, {...relations});
    }
}
