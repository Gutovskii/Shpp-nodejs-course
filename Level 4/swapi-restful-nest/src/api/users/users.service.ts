import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { RolesService } from '../roles/roles.service';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { Roles } from '../roles/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => RolesService))
    private _rolesService: RolesService,
    private _repoWrapper: RepositoryWrapper,
  ) {}

  findByPage(page: number, count: number): Promise<PaginationResult<User>> {
    return this._repoWrapper.users.findByPage(page, count);
  }

  findByRoles(roleNames: string[]): Promise<User[]> {
    return this._repoWrapper.users.find({
      where: {
        roles: {
          name: In(roleNames),
        },
      },
      relations: { roles: true },
    });
  }

  async findByName(username: string, ignoreExistance = false): Promise<User> {
    const user = await this._repoWrapper.users.findOne({
      where: { username },
      relations: { roles: true },
    });
    if (!user && !ignoreExistance)
      throw new NotFoundException(
        `User with name '${username}' does not exits`,
      );
    return user;
  }

  async deleteByName(username: string): Promise<User> {
    const userToDelete = await this.findByName(username);
    return this._repoWrapper.users.remove(userToDelete);
  }

  async addRole(username: string, roleName: string): Promise<User | void> {
    const user = await this.findByName(username);
    const role = await this._rolesService.findByName(roleName, true);
    if (!role) {
      const newRole = new Role();
      newRole.name = roleName;
      await this._repoWrapper.roles.create(newRole);
      user.roles.push(newRole);
      return this._repoWrapper.users.save(user);
    }
    if (role.name === Roles.ADMIN) {
      user.roles = user.roles.filter((role) => role.name !== Roles.USER);
    }
    user.roles.push(role);
    return this._repoWrapper.users.save(user);
  }

  async removeRole(username: string, roleName: string) {
    const user = await this.findByName(username);
    if (user.roles.length === 1 && user.roles[0].name === Roles.USER) {
      throw new BadRequestException(
        `Impossible to delete last ${Roles.USER} role`,
      );
    }
    if (!user.roles.some((role) => role.name === roleName)) {
      throw new NotFoundException(`User doesn't have ${roleName} role`);
    }
    user.roles = user.roles.filter((role) => role.name !== roleName);
    if (!user.roles.length) {
      const userRole = await this._rolesService.findByName(Roles.USER);
      user.roles.push(userRole);
    }
    return this._repoWrapper.users.save(user);
  }
}
