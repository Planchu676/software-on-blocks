product_repository = require('./product_repository')

exports.create = async (product_params) => {
    if (product_params.name == undefined){
        throw 'product name cant be empty'
    }

    if (product_params.business_user_id == undefined){
        throw 'the business id cant be empty'
    }

    console.log("hols")
    return await product_repository.create(product_params)
}


