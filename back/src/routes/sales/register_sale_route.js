const express = require('express')
const router = express.Router()
const register_sale_controller = require('../../sales/register_sale/register_sale')


router.post('/', (req, res) =>{
    register_sale_controller.post
});

module.exports = router