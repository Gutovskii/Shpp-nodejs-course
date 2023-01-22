import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { RolesAccess } from '../auth/decorators/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from './role.entity';
import { Roles } from './roles.enum';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
@ApiExtraModels(Role)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard)
export class RolesController {
    constructor(
        private _rolesService: RolesService
    ) {}
    
    @Get()
    @ApiResponseData(Role)
    async findAll() {
        return this._rolesService.findAll();
    }

    @Delete(':roleName')
    @ApiResponseData(Role)
    async deleteRole(@Param('roleName') roleName: string) {
        return this._rolesService.delete(roleName);
    }
}
