import { applyDecorators } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { RolesForRoute } from 'src/api/roles/roles.decorator';
import { Roles } from 'src/api/roles/roles.enum';

export const OPENAPI_JWT_NAME = 'token';

export const RolesAccess = (...roles: Roles[]) => {
  return applyDecorators(
    RolesForRoute(...roles),
    ApiBasicAuth(OPENAPI_JWT_NAME),
  );
};
