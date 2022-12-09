import { SetMetadata } from '@nestjs/common';
import { Roles } from './roles.enum';

export const ROLES_KEY = 'ROLES';

export const RolesForRoute = (...args: Roles[]) => SetMetadata(ROLES_KEY, args);
