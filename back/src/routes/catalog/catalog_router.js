const express = require('express')
const router = express.Router()
const product_finder_controller = require('../../product/product_finder_controller')


router.get('/', (req, res) =>{
    product_finder_controller.get(req, res)
});

module.exports = router