import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
import { Person } from './person.entity';
import {
  imageMulterOptions,
  IMAGES_MAX_COUNT,
} from 'src/api/images/image-multer-options';
import { PersonRelations } from './dto/person-relations.dto';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';
import { ApiPaginationResult } from 'src/common/docs/pagination-result.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

@Controller('people')
@ApiTags('people')
@ApiExtraModels(Person)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PeopleController {
  constructor(
    @InjectMapper() private _mapper: Mapper,
    private _peopleService: PeopleService,
  ) {}

  @Get()
  @ApiPaginationResult(Person)
  @UsePipes(ParseIntPipe)
  @RolesAccess(Roles.USER)
  async getPeopleByPage(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this._peopleService.findByPage(page, count);
  }

  @Get(':id')
  @ApiResponseData(Person)
  @RolesAccess(Roles.USER)
  async getPersonById(@Param('id', ParseIntPipe) id: number) {
    const person = await this._peopleService.findOne(id);
    if (!person) throw new NotFoundException();
    return person;
  }

  @Post()
  @ApiResponseData(Person, HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async createPerson(
    @Body(ValidationPipe) dto: CreatePersonDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const personToCreate = await this._mapper.mapAsync(
      dto,
      CreatePersonDto,
      Person,
    );
    return this._peopleService.create(personToCreate, images);
  }

  @Put(':id')
  @ApiResponseData(Person)
  async updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePersonDto,
  ) {
    const exists = await this._peopleService.exists(id);
    if (!exists) throw new NotFoundException();
    const personToUpdate = await this._mapper.mapAsync(
      dto,
      UpdatePersonDto,
      Person,
    );
    return this._peopleService.update(id, personToUpdate);
  }

  @Delete(':id')
  @ApiResponseData(Person)
  async removePerson(@Param('id', ParseIntPipe) id: number) {
    const personToDelete = await this._peopleService.findOne(id);
    if (!personToDelete) throw new NotFoundException();
    return this._peopleService.remove(personToDelete);
  }

  @Post('add-images/:id')
  @ApiResponseData(Person)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const person = await this._peopleService.findOne(id);
    if (!person) throw new NotFoundException();
    return this._peopleService.addImages(person, images);
  }

  @Put('add-relations/:id')
  @ApiResponseData(Person)
  async addRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PersonRelations,
  ) {
    const personToUpdate = await this._peopleService.findOne(id);
    if (!personToUpdate) throw new NotFoundException();
    return this._peopleService.addRelations(personToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  @ApiResponseData(Person)
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PersonRelations,
  ) {
    const personToUpdate = await this._peopleService.findOne(id);
    if (!personToUpdate) throw new NotFoundException();
    return this._peopleService.removeRelations(personToUpdate, {
      ...relations,
    });
  }
}
