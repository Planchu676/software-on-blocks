const Business_user_repository = require('../../../business_user/business_user_repository')
const crypto = require('crypto')

exports.signup = async (user_params)  =>{
    retrieved_business_user = await Business_user_repository.find_by_email(user_params.email)
    if(retrieved_business_user != null){
        throw 'user with specified email already exists'
    }
    console.log(user_params)
    password_hash = crypto.createHash('sha1')
                        .update(user_params.password)
                        .digest('hex')
    const user_params_with_password_hash = {
        name: user_params.name,
        email: user_params.email,
        password: password_hash
    }
    created_user = await Business_user_repository.create(user_params_with_password_hash)
}