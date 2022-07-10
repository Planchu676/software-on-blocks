const express = require('express')
const router = express.Router()
const create_product_controller = require('../../product/create_product_controller')


router.post('/', (req, res) =>{
    try{
        create_product_controller.post(req, res)
    }
    catch(err){
        res.send(err)
    }
});

module.exports = router