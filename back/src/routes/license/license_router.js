const express = require('express')
const router = express.Router()
const license_finder_controller = require('../../license/license_finder_controller')


router.get('/', (req, res) =>{
    license_finder_controller.get
});

module.exports = router