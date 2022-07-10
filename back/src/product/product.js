const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:', {logging: false});
const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    image_path: {
        type: DataTypes.STRING,
    },
    business_user_id: {
        type: DataTypes.INTEGER
    } 
})


module.exports.Product = Product