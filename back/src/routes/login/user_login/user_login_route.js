const express = require('express')
const router = express.Router()
const user_login_controller = require('../../../login/user_login/user_login/user_login_controller')


router.post('/', (req, res) =>{
    user_login_controller.login(req, res)
});

module.exports = router