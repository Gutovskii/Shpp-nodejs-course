import express, { Router } from 'express'
const router: Router = express.Router()

import { 
    getItems,
    addItem,
    changeItem,
    deleteItem } from '../controllers/items'

router.route('/items')
                    .get(getItems)
                    .post(addItem)
                    .put(changeItem)
                    .delete(deleteItem)

export default router