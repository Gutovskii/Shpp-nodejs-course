import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserPayload } from '../auth/dto/user-payload.dto';
import { ROLES_KEY } from './roles.decorator';
import { Roles } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private _reflector: Reflector
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this._reflector.getAllAndMerge<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles.length) return true;

        const { user } = context.switchToHttp().getRequest() as { user: UserPayload };
        return requiredRoles.some(requiredRole => user.roles.some(role => role.name === requiredRole));
    }
}
