const Business_user_repository = require('../../../business_user/business_user_repository')
const crypto = require('crypto')
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')

exports.login = async (email, password)  =>{
    dotenv.config()
    retrieved_business_user = await Business_user_repository.find_by_email(email)
    
    password_hash = crypto.createHash('sha1') // <-- You can use other than sha1
                        .update(password) //set what to encode
                        .digest('hex')

    if(retrieved_business_user.password != password_hash){
        throw new error('user with that combination of email and password does not exist')
    }

    return jwt.sign({business_user_id: retrieved_business_user.id}, process.env.TOKEN_SECRET, {expiresIn: '1d'})
}