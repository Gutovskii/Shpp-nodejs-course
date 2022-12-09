import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles/role.entity';
import { RolesService } from '../roles/roles.service';
import { Roles } from '../roles/roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private _repoWrapper: RepositoryWrapper,
        private _userService: UsersService,
        private _jwtService: JwtService,
        private _rolesService: RolesService,
    ) {}

    async login(username: string, password: string) {
        const candidate = await this._userService.getUserByName(username);
        const isPasswordCorrect = await bcrypt.compare(password, candidate.hashPassword);
        if (!isPasswordCorrect) throw new BadRequestException('Password incorrect');

        const payload = { username, roles: candidate.roles }
        const token = await this._jwtService.signAsync(payload);
        return token;
    }

    async register(username: string, password: string) {
        const user = await this._userService.getUserByName(username, true);
        if (user) throw new BadRequestException('User is already exists');
        
        const newUser = new User();
        newUser.username = username;
        newUser.hashPassword = await bcrypt.hash(password, 6);
        const userRoles = await this._rolesService.getRoleByNames(Roles.USER); // Add ADMIN if you want to create the admin ;)
        newUser.roles = userRoles;

        await this._repoWrapper.users.create(newUser);
        const { hashPassword, id, ...publicUserData } = newUser;
        
        const payload = { ...publicUserData };
        const token = await this._jwtService.signAsync(payload);
        return token;
    }
}
