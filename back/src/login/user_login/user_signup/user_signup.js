const User_repository = require('../../../user/user_repository')
const crypto = require('crypto')

exports.signup = async (user_params)  =>{
    retrieved_user = await User_repository.find_by_email(user_params.email)
    if(retrieved_user != null){
        throw new error('User with that email already exists')
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
    created_user = await User_repository.create(user_params_with_password_hash)
}