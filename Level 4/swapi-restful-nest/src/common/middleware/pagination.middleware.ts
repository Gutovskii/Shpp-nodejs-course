import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CommonEnum } from "../common.enum";

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req.query.page = req.query.page || CommonEnum.MIDDLEWARE_PAGINATION_FIRST_PAGE;
        req.query.count = req.query.count || CommonEnum.MIDDLEWARE_PAGINATION_INITIAL_COUNT;
        next();
    }
}