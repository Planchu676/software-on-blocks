const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:',{logging: false});
const Business_user = sequelize.define("Business_user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allownull: false,
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allownull: false,
        unique: false
    }
})

module.exports.Business_user = Business_user