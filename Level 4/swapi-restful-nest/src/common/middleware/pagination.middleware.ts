import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const firstPage = '1';
        const inititalCount = '3';
        
        req.query.page = req.query.page || firstPage;
        req.query.count = req.query.count || inititalCount;

        next();
    }
}