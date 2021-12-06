const express = require('express')
const router = express.Router()

const {
    getItems,
    addItem,
    changeItem,
    deleteItem
} = require('../controllers/items')

router.route('/getItems').get(getItems)
router.route('/addItem').post(addItem)
router.route('/changeItem').put(changeItem)
router.route('/deleteItem').delete(deleteItem)

module.exports = router