const Business_user = require("./business_user").Business_user


exports.create = async (user_param) => {
    const user_data = {
        name: user_param.name,
        email: user_param.email,
        password: user_param.password
    }
    const business_user = await Business_user.create(user_data)
    console.log(business_user.name)
    return business_user
}

exports.find_by_id = async (id) => {
    const business_user = await Business_user.findOne({
        where: {
            id: id
        }
    })
    return business_user
}

exports.find_by_email = async (email) => {
    const business_user = await Business_user.findOne({
        where: {
            email: email
        }
    })
    return business_user
}