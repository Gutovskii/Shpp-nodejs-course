import express from 'express'
const router = express.Router()

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