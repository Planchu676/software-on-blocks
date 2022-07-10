const express = require('express')
const router = express.Router()
const sale_finder_by_buyer_id_controller = require('../../sales/sale_finder/sale_finder_by_buyer_id_controller')


router.get('/', (req, res) =>{
    sale_finder_by_buyer_id_controller.get
});

module.exports = router