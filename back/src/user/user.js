const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:', {logging: false});

const User = sequelize.define("User", {
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

module.exports.User = User