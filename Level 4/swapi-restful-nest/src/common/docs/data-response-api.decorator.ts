import { applyDecorators, HttpStatus, Type } from "@nestjs/common";
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiResponseData = <T extends Type<any>>(entity: T, status = HttpStatus.OK) => applyDecorators(
    ApiResponse({
        status,
        schema: {
            properties: {
                data: { $ref: getSchemaPath(entity) }
            }
        }
    })
);