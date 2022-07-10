const login = require('./user_login').login

exports.login = async (req, res, next) => {
    try {
        console.log(req.body)
        jwt = await login(req.body.email, req.body.password)
        res.send({access_token: jwt})
    }
    catch(err) {
        console.error(`Error while loging in`, err.message)
        res.send({
            access_token: null,
            error: err.message
        })
    }
}