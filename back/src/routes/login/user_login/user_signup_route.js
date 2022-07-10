const express = require('express')
const router = express.Router()
const user_signup_controller = require('../../../login/user_login/user_signup/user_signup_controller')


router.post('/', (req, res) =>{
    user_signup_controller.signup(req, res)
})

module.exports = router