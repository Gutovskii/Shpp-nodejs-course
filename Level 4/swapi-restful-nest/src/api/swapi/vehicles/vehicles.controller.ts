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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import {
  imageMulterOptions,
  IMAGES_MAX_COUNT,
} from 'src/api/images/image-multer-options';
import { VehicleRelations } from './dto/vehicle-relations.dto';
import { RolesAccess } from 'src/api/auth/decorators/auth.decorator';
import { Roles } from 'src/api/roles/roles.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/roles/roles.guard';
import { AddImagesDto } from 'src/api/images/dto/add-images.dto';
import { ApiPaginationResult } from 'src/common/docs/pagination-result.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

@Controller('vehicles')
@ApiTags('vehicles')
@ApiExtraModels(Vehicle)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiclesController {
  constructor(
    @InjectMapper() private _mapper: Mapper,
    private _vehiclesService: VehiclesService,
  ) {}

  @Get()
  @ApiPaginationResult(Vehicle)
  @UsePipes(ParseIntPipe)
  @RolesAccess(Roles.USER)
  async getVehiclesByPage(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this._vehiclesService.findByPage(page, count);
  }

  @Get(':id')
  @ApiResponseData(Vehicle)
  @RolesAccess(Roles.USER)
  async getVehicleById(@Param('id', ParseIntPipe) id: number) {
    const vehicle = await this._vehiclesService.findOne(id);
    if (!vehicle) throw new NotFoundException();
    return vehicle;
  }

  @Post()
  @ApiResponseData(Vehicle)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async createVehicle(
    @Body(ValidationPipe) dto: CreateVehicleDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const vehicleToCreate = await this._mapper.mapAsync(
      dto,
      CreateVehicleDto,
      Vehicle,
    );
    return this._vehiclesService.create(vehicleToCreate, images);
  }

  @Put(':id')
  @ApiResponseData(Vehicle)
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVehicleDto,
  ) {
    const exists = await this._vehiclesService.exists(id);
    if (!exists) throw new NotFoundException();
    const vehicleToUpdate = await this._mapper.mapAsync(
      dto,
      UpdateVehicleDto,
      Vehicle,
    );
    return this._vehiclesService.update(id, vehicleToUpdate);
  }

  @Delete(':id')
  @ApiResponseData(Vehicle)
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    const vehicleToDelete = await this._vehiclesService.findOne(id);
    if (!vehicleToDelete) throw new NotFoundException();
    return this._vehiclesService.remove(vehicleToDelete);
  }

  @Post('add-images/:id')
  @ApiResponseData(Vehicle)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(
    FilesInterceptor('images', IMAGES_MAX_COUNT, imageMulterOptions),
  )
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const vehicle = await this._vehiclesService.findOne(id);
    if (!vehicle) throw new NotFoundException();
    return this._vehiclesService.addImages(vehicle, images);
  }

  @Put('add-relations/:id')
  @ApiResponseData(Vehicle)
  async addRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: VehicleRelations,
  ) {
    const vehicleToUpdate = await this._vehiclesService.findOne(id);
    if (!vehicleToUpdate) throw new NotFoundException();
    return this._vehiclesService.addRelations(vehicleToUpdate, {
      ...relations,
    });
  }

  @Delete('remove-relations/:id')
  @ApiResponseData(Vehicle)
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: VehicleRelations,
  ) {
    const vehicleToUpdate = await this._vehiclesService.findOne(id);
    if (!vehicleToUpdate) throw new NotFoundException();
    return this._vehiclesService.removeRelations(vehicleToUpdate, {
      ...relations,
    });
  }
}
