const User_repository = require('../../../user/user_repository')
const crypto = require('crypto')
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')

exports.login = async (email, password)  =>{
    dotenv.config()
    retrieved_user = await User_repository.find_by_email(email)
    
    password_hash = crypto.createHash('sha1') // <-- You can use other than sha1
                        .update(password) //set what to encode
                        .digest('hex')

    if(retrieved_user.password != password_hash){
        throw new error('user with provided credentials does not exist')
    }

    return jwt.sign({id: retrieved_user.id}, process.env.TOKEN_SECRET, {expiresIn: '1d'})
}