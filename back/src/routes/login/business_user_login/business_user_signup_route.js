const express = require('express')
const router = express.Router()
const business_user_signup_controller = require('../../../login/business_user_login/business_user_signup/business_user_signup_controller')


router.post('/', (req, res) =>{
    business_user_signup_controller.signup(req, res)
})

module.exports = router