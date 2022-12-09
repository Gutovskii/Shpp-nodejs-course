import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { In } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Role } from './role.entity';
import { Roles } from './roles.enum';

@Injectable()
export class RolesService {
    constructor(
        private _repoWrapper: RepositoryWrapper,
        @Inject(forwardRef(() => UsersService)) private _usersService: UsersService
    ) {}

    async getRoles() {
        return await this._repoWrapper.roles.find({});
    }

    async getRoleByName(roleName: string) {
        const role = await this._repoWrapper.roles.findOne({where: {name: roleName}});
        if (!role) throw new NotFoundException(`Role '${role.name}' is not found`);
        return role;
    }

    async getRoleByNames(...roleNames: string[]) {
        const roles = await this._repoWrapper.roles.find({where: {name: In(roleNames)}});
        if (!roles.length) throw new NotFoundException(`Roles '${roleNames.join(', ')}' are not found`);
        return roles;
    }

    async create(role: Role) {
        return await this._repoWrapper.roles.create(role);
    }

    async delete(roleName: string) {
        if (roleName === Roles.USER || roleName === Roles.ADMIN)
            throw new BadRequestException('Roles USER or ADMIN can\'t be deleted');

        const roleToDelete = await this.getRoleByName(roleName);
        const userRole = await this.getRoleByName(Roles.USER);
        const users = await this._usersService.getUsersByRoles([roleToDelete.name]);
        users.map(user => {
            if (user.roles.length === 1) user.roles.push(userRole);
        });
        await this._repoWrapper.users.updateMany(users);
        
        return await this._repoWrapper.roles.remove(roleToDelete);
    }
}
