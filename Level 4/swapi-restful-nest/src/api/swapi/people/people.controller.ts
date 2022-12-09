import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
import { Person } from './person.entity';
import { imageMulterOptions } from 'src/api/images/image-multer-options';
import { PersonRelations } from './dto/person-relations.dto';
import { ImagesEnum } from 'src/api/images/images.types';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';

@ApiTags('people')
@Controller('people')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PeopleController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _peopleService: PeopleService
    ) {}
 
    @Get()
    @UsePipes(ParseIntPipe)
    @RolesAccess(Roles.USER)
    async getPeopleByPage(@Query('page') page: number, @Query('count') count: number) {
        const partOfPeople = await this._peopleService.findByPage(page, count);
        return partOfPeople;
    }

    @Get(':id')
    @RolesAccess(Roles.USER)
    async getPersonById(@Param('id', ParseIntPipe) id: number) {
        const person = await this._peopleService.findOne(id);
        if (!person) throw new NotFoundException();
        return person;
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async createPerson(@Body(ValidationPipe) dto: CreatePersonDto, @UploadedFiles() images: Express.Multer.File[]) {
        const personToCreate = await this._mapper.mapAsync(dto, CreatePersonDto, Person);
        return await this._peopleService.create(personToCreate, images);
    }

    @Put(':id')
    async updatePerson(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdatePersonDto) {
        const person = await this._peopleService.findOne(id);
        if (!person) throw new NotFoundException();
        const personToUpdate = await this._mapper.mapAsync(dto, UpdatePersonDto, Person);
        return await this._peopleService.update(id, personToUpdate);
    }

    @Delete(':id')
    async removePerson(@Param('id', ParseIntPipe) id: number) {
        const personToDelete = await this._peopleService.findOne(id);
        if (!personToDelete) throw new NotFoundException();
        return await this._peopleService.remove(personToDelete);
    }

    @Post('add-images/:id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', ImagesEnum.MAX_COUNT, imageMulterOptions))
    async addImages(@Param('id', ParseIntPipe) id: number, 
                    @UploadedFiles() images: Express.Multer.File[],
                    @Body(ValidationPipe) dto: AddImagesDto) {
        const person = await this._peopleService.findOne(id);
        if (!person) throw new NotFoundException();
        return await this._peopleService.addImages(person, images);
    }

    @Put('add-relations/:id')
    async addRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: PersonRelations) {
        const personToUpdate = await this._peopleService.findOne(id);
        if (!personToUpdate) throw new NotFoundException(); 
        return await this._peopleService.addRelations(personToUpdate, {...relations});
    }

    @Delete('remove-relations/:id')
    async removeRelations(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) relations: PersonRelations) {
        const personToUpdate = await this._peopleService.findOne(id);
        if (!personToUpdate) throw new NotFoundException();
        return await this._peopleService.removeRelations(personToUpdate, {...relations});
    }
}
