const signup = require('./user_signup').signup

exports.signup = async (req, res, next) => {
    try {
        user_params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        await signup(user_params)
        res.send({isSuccess: true})
    }
    catch(err) {
        console.error(`Error while signing up`, err.message)
        res.send({
            isSuccess: false,
            error: err.message
        })
    }
}