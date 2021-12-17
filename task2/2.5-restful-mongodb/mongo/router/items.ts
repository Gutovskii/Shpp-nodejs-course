import {
    addItem, 
    changeItem, 
    deleteItem } from '../controllers/items'

export const itemsRouter = (req: any, res: any, next: any) => {
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