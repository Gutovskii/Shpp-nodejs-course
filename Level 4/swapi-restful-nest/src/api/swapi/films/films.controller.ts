import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { imageMulterOptions, IMAGES_MAX_COUNT } from 'src/api/images/image-multer-options';
import { FilmRelations } from './dto/film-relations.dto';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './film.entity';
import { FilmsService } from './films.service';
import { Roles } from 'src/api/roles/roles.enum';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';
import { ApiPaginationResult } from 'src/common/docs/pagination-result.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

@Controller('films')
@ApiTags('films')
@ApiExtraModels(Film)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilmsController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _filmsService: FilmsService
    ) {}

    @Get()
    @ApiPaginationResult(Film)
    @UsePipes(ParseIntPipe)
    @RolesAccess(Roles.USER)
    async getFilmsByPage(@Query('page') page: number, @Query('count') count: number) {
        return this._filmsService.findByPage(page, count);
    }

    @Get(':id')
    @ApiResponseData(Film)
    @RolesAccess(Roles.USER)
    async getFilmById(@Param('id', ParseIntPipe) id: number) {
        const film = await this._filmsService.findOne(id);
        if (!film) throw new NotFoundException();
        return film;
    }

    @Post()
    @ApiResponseData(Film, HttpStatus.CREATED)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions))
    async createFilm(@Body(ValidationPipe) dto: CreateFilmDto, @UploadedFiles() images: Express.Multer.File[]) {
        const filmToCreate = await this._mapper.mapAsync(dto, CreateFilmDto, Film);
        return this._filmsService.create(filmToCreate, images);
    }

    @Put(':id')
    @ApiResponseData(Film)
    async updateFilm(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdateFilmDto) {
        const exists = await this._filmsService.exists(id);
        if (!exists) throw new NotFoundException();
        const filmToUpdate = await this._mapper.mapAsync(dto, UpdateFilmDto, Film);
        return this._filmsService.update(id, filmToUpdate);
    }

    @Delete(':id')
    @ApiResponseData(Film)
    async removeFilm(@Param('id', ParseIntPipe) id: number) {
        const filmToDelete = await this._filmsService.findOne(id);
        if (!filmToDelete) throw new NotFoundException();
        return this._filmsService.remove(filmToDelete);
    }

    @Post('add-images/:id')
    @ApiResponseData(Film)
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: AddImagesDto})
    @UseInterceptors(FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions))
    async addImages(@Param('id', ParseIntPipe) id: number, @UploadedFiles() images: Express.Multer.File[]) {
        const film = await this._filmsService.findOne(id);
        if (!film) throw new NotFoundException();
        return this._filmsService.addImages(film, images);
    }

    @Put('add-relations/:id')
    @ApiResponseData(Film)
    async createRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: FilmRelations) {
        const filmToUpdate = await this._filmsService.findOne(id);
        if (!filmToUpdate) throw new NotFoundException();
        return this._filmsService.addRelations(filmToUpdate, {...relations});
    }
    
    @Delete('remove-relations/:id')
    @ApiResponseData(Film)
    async removeRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: FilmRelations) {
        const filmToUpdate = await this._filmsService.findOne(id);
        if (!filmToUpdate) throw new NotFoundException();
        return await this._filmsService.removeRelations(filmToUpdate, {...relations});
    }
}
