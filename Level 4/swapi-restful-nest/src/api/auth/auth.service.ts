import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { Roles } from '../roles/roles.enum';

const SALT_ROUNDS = 6;

@Injectable()
export class AuthService {
    constructor(
        private _repoWrapper: RepositoryWrapper,
        private _userService: UsersService,
        private _jwtService: JwtService,
        private _rolesService: RolesService,
    ) {}

    async login(username: string, password: string): Promise<string> {
        const candidate = await this._userService.findByName(username);
        const isPasswordCorrect = await bcrypt.compare(password, candidate.hashPassword);
        if (!isPasswordCorrect) throw new BadRequestException('Password incorrect');

        const payload = { username, roles: candidate.roles }
        const token = await this._jwtService.signAsync(payload);
        return token;
    }

    async register(username: string, password: string): Promise<string> {
        const user = await this._userService.findByName(username, true);
        if (user) throw new BadRequestException('User is already exists');
        
        const newUser = new User();
        newUser.username = username;
        newUser.hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const userRoles = await this._rolesService.findByNames(Roles.USER); // Chnage to Roles.ADMIN if you want to create the admin ;)
        newUser.roles = userRoles;

        await this._repoWrapper.users.create(newUser);
        const { hashPassword, id, ...publicUserData } = newUser;
        
        const payload = { ...publicUserData };
        const token = await this._jwtService.signAsync(payload);
        return token;
    }
}
