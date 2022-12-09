import { applyDecorators, UseGuards } from "@nestjs/common"
import { ApiBasicAuth } from "@nestjs/swagger";
import { RolesForRoute } from "src/api/roles/roles.decorator";
import { Roles } from "src/api/roles/roles.enum"
import { CommonEnum } from "src/common/common.enum";

export const RolesAccess = (...roles: Roles[]) => {
    return applyDecorators(
        RolesForRoute(...roles),
        ApiBasicAuth(CommonEnum.OPENAPI_JWT_NAME)
    );
}