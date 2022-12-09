import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { In } from "typeorm";
import { RepositoryWrapper } from "src/repository/repository.wrapper";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(
        private _repoWrapper: RepositoryWrapper,
        @Inject(forwardRef(() => RolesService)) private _rolesService: RolesService
    ) {}

    async getUsersByPage(page: number, count: number) {
        return await this._repoWrapper.users.findByPage(page, count);
    }

    async getUsersByRoles(roleNames: string[]) {
        return await this._repoWrapper.users.find({where: {roles: In(roleNames)}});
    }

    async getUserByName(username: string, ignoreExistance = false) {
        const user = await this._repoWrapper.users.findOne({
            where: {username},
            relations: {
                roles: true
            }
        });
        if (!user && !ignoreExistance) throw new NotFoundException(`User with name '${username}' does not exits`)
        return user;
    }

    async deleteUserByName(username: string) {
        const userToDelete = await this.getUserByName(username);
        return await this._repoWrapper.users.remove(userToDelete);
    }

    async addRoleToUser(username: string, roleName: string) {
        const user = await this.getUserByName(username);
        const role = await this._rolesService.getRoleByName(roleName);
        user.roles.push(role);
        return await this._repoWrapper.users.save(user);
    }

    async removeRoleFromUser(username: string, roleName: string) {
        const user = await this.getUserByName(username);
        user.roles = user.roles.filter(role => role.name !== roleName);
        return await this._repoWrapper.users.save(user);
    }
}