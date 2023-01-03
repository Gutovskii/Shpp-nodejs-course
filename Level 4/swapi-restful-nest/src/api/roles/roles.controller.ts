import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesAccess } from '../auth/decorators/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './roles.enum';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard)
export class RolesController {
    constructor(
        @InjectMapper() private _mapper: Mapper,
        private _rolesService: RolesService
    ) {}
    
    @Get()
    async findAll() {
        return this._rolesService.findAll();
    }

    @Delete(':roleName')
    async deleteRole(@Param('roleName') roleName: Roles) {
        return this._rolesService.delete(roleName);
    }
}
