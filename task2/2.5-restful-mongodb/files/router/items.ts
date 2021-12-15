import {
    addItem,
    editItem,
    deleteItem } from '../controllers/items'

export const itemsRouter = (req: any, res: any, next: any) => {
    switch (req.query.action) {
        case 'addItem':
            return addItem(req, res)
        case 'editItem':
            return editItem(req, res)
        case 'deleteItem':
            return deleteItem(req, res)
        default: 
            next()
    }
}

export default itemsRouter