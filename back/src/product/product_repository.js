const Product= require("./product").Product
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.create = async (product_params) => {
    const product_data = {
        name: product_params.name,
        business_user_id: product_params.business_user_id
    }
    const product = await Product.create(product_data)
    return product
}

exports.find_all = async () => {
    return await Product.findAll()
}

exports.find_by_name = async (product_name) => {
    return await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${product_name}%`
            }
        }
    })
}

exports.find_by_id = async (id) => {
    return await Product.findAll({
        where: {
            id: id
        }
    })
}

exports.find_by_business_id = async (business_id) => {
    return await Product.findAll({
        where: {
            business_user_id: business_id
        }
    })
}