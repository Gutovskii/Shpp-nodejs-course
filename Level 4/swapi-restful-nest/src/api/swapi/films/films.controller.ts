import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { imageMulterOptions } from 'src/api/images/image-multer-options';
import { FilmRelations } from './dto/film-relations.dto';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './film.entity';
import { FilmsService } from './films.service';
import { ImagesEnum } from 'src/api/images/images.types';
import { Roles } from 'src/api/roles/roles.enum';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';

@ApiTags('films')
@Controller('films')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilmsController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _filmsService: FilmsService
    ) {}

    @Get()
    @UsePipes(ParseIntPipe)
    @RolesAccess(Roles.USER)
    async getFilmsByPage(@Query('page') page: number, @Query('count') count: number) {
        return this._filmsService.findByPage(page, count);
    }

    @Get(':id')
    @RolesAccess(Roles.USER)
    async getFilmById(@Param('id', ParseIntPipe) id: number) {
        const film = await this._filmsService.findOne(id);
        if (!film) throw new NotFoundException();
        return film;
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async createFilm(@Body(ValidationPipe) dto: CreateFilmDto, @UploadedFiles() images: Express.Multer.File[]) {
        const filmToCreate = await this._mapper.mapAsync(dto, CreateFilmDto, Film);
        return this._filmsService.create(filmToCreate, images);
    }

    @Put(':id')
    async updateFilm(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdateFilmDto) {
        const film = await this._filmsService.findOne(id);
        if (!film) throw new NotFoundException();
        const filmToUpdate = await this._mapper.mapAsync(dto, UpdateFilmDto, Film);
        return this._filmsService.update(id, filmToUpdate);
    }

    @Delete(':id')
    async removeFilm(@Param('id', ParseIntPipe) id: number) {
        const filmToDelete = await this._filmsService.findOne(id);
        if (!filmToDelete) throw new NotFoundException();
        return this._filmsService.remove(filmToDelete);
    }

    @Post('add-images/:id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async addImages(@Param('id', ParseIntPipe) id: number, 
                    @UploadedFiles() images: Express.Multer.File[],
                    @Body(ValidationPipe) dto: AddImagesDto) {
        const film = await this._filmsService.findOne(id);
        if (!film) throw new NotFoundException();
        return this._filmsService.addImages(film, images);
    }

    @Put('add-relations/:id')
    async createRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: FilmRelations) {
        const filmToUpdate = await this._filmsService.findOne(id);
        if (!filmToUpdate) throw new NotFoundException();
        return this._filmsService.addRelations(filmToUpdate, {...relations});
    }
    
    @Delete('remove-relations/:id')
    async removeRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: FilmRelations) {
        const filmToUpdate = await this._filmsService.findOne(id);
        if (!filmToUpdate) throw new NotFoundException();
        return await this._filmsService.removeRelations(filmToUpdate, {...relations});
    }
}
