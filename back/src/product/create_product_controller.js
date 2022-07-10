const { JsonWebTokenError } = require('jsonwebtoken')
const product_creator = require('./product_creator')
const jwt = require('jsonwebtoken')

exports.post = async (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        console.log(req.body)
        auth_token = req.headers.authorization
        if (auth_token == null) {
            res.status(401)
            res.send({error: "authorization token not provided"})
        }
        jwt.verify(auth_token, process.env.TOKEN_SECRET)
        product_params = {
            name: req.body.name,
            business_user_id: req.body.business_user_id,
        }
        product = await product_creator.create(product_params)

        res.send({success: "True"})
    }
    catch(err) {
        console.error(`Error while creating product`, err.message)
        res.send({error:'error while creating product ' + err})
    }
}