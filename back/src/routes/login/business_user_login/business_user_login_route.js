const express = require('express')
const router = express.Router()
const business_user_login_controller = require('../../../login/business_user_login/business_user_login/business_user_login_controller')


router.post('/', (req, res) =>{
    business_user_login_controller.login(req, res)
});

module.exports = router