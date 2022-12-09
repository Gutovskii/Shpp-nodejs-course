import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesAccess } from '../auth/decorators/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { Roles } from './roles.enum';
import { RolesGuard } from './roles.guard';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _rolesService: RolesService
    ) {}
    
    @Get()
    async getRoles() {
        return await this._rolesService.getRoles();
    }

    @Post()
    async createRole(@Body(ValidationPipe) dto: CreateRoleDto) {
        const role = await this._mapper.mapAsync(dto, CreateRoleDto, Role);
        return await this._rolesService.create(role);
    }

    @Delete(':roleName')
    async deleteRole(@Param('roleName') roleName: string) {
        return await this._rolesService.delete(roleName);
    }
}
