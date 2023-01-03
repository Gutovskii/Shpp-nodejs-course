import { Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { RolesAccess } from "../auth/decorators/auth.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../roles/roles.enum";
import { RolesGuard } from "../roles/roles.guard";
import { UsersService } from "./users.service";

@ApiTags('users')
@Controller('users')
@RolesAccess(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private _usersService: UsersService
    ) {}

    @Get()
    async findByPage(@Query('page') page: number, @Query('count') count: number) {
        return this._usersService.findByPage(page, count);
    }

    @Get(':username')
    async findByName(@Param('username') username: string) {
        return this._usersService.findByName(username);
    }

    @Delete(':username')
    async deleteUser(@Param('username') username: string) {
        return this._usersService.deleteByName(username);
    }

    @Post(':username/:roleName')
    async addRole(@Param('username') username: string, @Param('roleName') roleName: string) {
        return this._usersService.addRole(username, roleName);
    }

    @Delete(':username/:roleName')
    async removeRole(@Param('username') username: string, @Param('roleName') roleName: string) {
        return this._usersService.removeRole(username, roleName);
    }
}