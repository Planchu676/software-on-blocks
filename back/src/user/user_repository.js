const User = require("./user").User


exports.create = async (user_param) => {
    const user_data = {
        name: user_param.name,
        email: user_param.email,
        password: user_param.password
    }
    const user = await User.create(user_data)
    console.log(user.name)
    return user
}

exports.find_by_id = (id) => {
    const user = User.findOne({
        where: {
            id: id
        }
    })
    return user
}

exports.find_by_email = (email) => {
    const user = User.findOne({
        where: {
            email: email
        }
    })
    return user
}