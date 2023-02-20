import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResult } from '../classes/pagination.class';

export const ApiPaginationResult = <T extends Type<any>>(entity: T) =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            allOf: [
              { $ref: getSchemaPath(PaginationResult) },
              {
                properties: {
                  partOfEntities: {
                    type: 'array',
                    items: { $ref: getSchemaPath(entity) },
                  },
                },
              },
            ],
          },
        },
      },
    }),
  );
