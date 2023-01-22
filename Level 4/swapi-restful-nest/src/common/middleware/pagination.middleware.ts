import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

const MIDDLEWARE_DEFAULT_PAGINATION_FIRST_PAGE = '1';
const MIDDLEWARE_DEFAULT_PAGINATION_INITIAL_COUNT = '3';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req.query.page = req.query.page || MIDDLEWARE_DEFAULT_PAGINATION_FIRST_PAGE;
        req.query.count = req.query.count || MIDDLEWARE_DEFAULT_PAGINATION_INITIAL_COUNT;
        next();
    }
}