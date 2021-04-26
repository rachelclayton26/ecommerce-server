const {DataTypes} = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordhash:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;
