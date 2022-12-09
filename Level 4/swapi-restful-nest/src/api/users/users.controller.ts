import { Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
    async getUsersByPage(@Query('page') page: number, @Query('count') count: number) {
        return await this._usersService.getUsersByPage(page, count);
    }

    @Get(':username')
    async getUserByName(@Param('username') username: string) {
        return await this._usersService.getUserByName(username);
    }

    @Delete(':username')
    async deleteUser(@Param('username') username: string) {
        return await this._usersService.deleteUserByName(username);
    }

    @Post(':username/:roleName')
    async addRoleToUser(@Param('username') username: string, @Param('roleName') roleName: string) {
        return await this._usersService.addRoleToUser(username, roleName);
    }

    @Delete(':username/:roleName')
    async removeRoleFromUser(@Param('username') username: string, @Param('roleName') roleName: string) {
        return await this._usersService.removeRoleFromUser(username, roleName);
    }
}