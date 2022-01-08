import { Request, Response, NextFunction } from 'express'

import {
    addItem, 
    changeItem, 
    deleteItem } from '../controllers/items'

export const itemsRouter = (req: Request, res: Response, next: NextFunction) => {
    switch (req.query.action) {
        case 'addItem':
            return addItem(req, res)
        case 'changeItem':
            return changeItem(req, res)
        case 'deleteItem':
            return deleteItem(req, res)
        default:
            next()
    }
}