import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { In } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Role } from './role.entity';
import { Roles } from './roles.enum';

@Injectable()
export class RolesService {
  constructor(
    private _repoWrapper: RepositoryWrapper,
    @Inject(forwardRef(() => UsersService)) private _usersService: UsersService,
  ) {}

  findAll(): Promise<Role[]> {
    return this._repoWrapper.roles.find({});
  }

  async findByName(roleName: string, ignoreExistance = false): Promise<Role> {
    const role = await this._repoWrapper.roles.findOne({
      where: { name: roleName },
    });
    if (!role && !ignoreExistance)
      throw new NotFoundException(`Role '${roleName}' is not found`);
    return role;
  }

  async findByNames(...roleNames: string[]): Promise<Role[]> {
    const roles = await this._repoWrapper.roles.find({
      where: { name: In(roleNames) },
    });
    if (!roles.length)
      throw new NotFoundException(
        `Roles '${roleNames.join(', ')}' are not found`,
      );
    return roles;
  }

  create(role: Role): Promise<Role> {
    return this._repoWrapper.roles.create(role);
  }

  async delete(roleName: string): Promise<Role> {
    if (roleName === Roles.USER || roleName === Roles.ADMIN) {
      throw new BadRequestException("Roles USER or ADMIN can't be deleted");
    }
    const roleToDelete = await this.findByName(roleName);
    const userRole = await this.findByName(Roles.USER);
    const users = await this._usersService.findByRoles([roleName]);
    users.map((user) => {
      if (user.roles.length === 1) user.roles.push(userRole);
    });
    await this._repoWrapper.users.updateMany(users);

    return this._repoWrapper.roles.remove(roleToDelete);
  }
}
