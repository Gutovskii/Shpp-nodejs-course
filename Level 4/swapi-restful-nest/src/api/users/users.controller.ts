import { Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { ApiResponseData } from "src/common/docs/data-response-api.decorator";
import { ApiPaginationResult } from "src/common/docs/pagination-result.decorator";
import { RolesAccess } from "../auth/decorators/auth.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../roles/roles.enum";
import { RolesGuard } from "../roles/roles.guard";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller('users')
@ApiTags('users')
@ApiExtraModels(User)
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private _usersService: UsersService
    ) {}

    @Get()
    @ApiPaginationResult(User)
    async findByPage(@Query('page') page: number, @Query('count') count: number) {
        return this._usersService.findByPage(page, count);
    }

    @Get(':username')
    @ApiResponseData(User)
    async findByName(@Param('username') username: string) {
        return this._usersService.findByName(username);
    }

    @Delete(':username')
    @ApiResponseData(User)
    async deleteUser(@Param('username') username: string) {
        return this._usersService.deleteByName(username);
    }

    @Post(':username/:roleName')
    @ApiResponseData(User)
    async addRole(@Param('username') username: string, @Param('roleName') roleName: string) {
        return this._usersService.addRole(username, roleName);
    }

    @Delete(':username/:roleName')
    @ApiResponseData(User)
    async removeRole(@Param('username') username: string, @Param('roleName') roleName: string) {
        return this._usersService.removeRole(username, roleName);
    }
}