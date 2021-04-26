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
<<<<<<< HEAD
        allowNull: false,
    }
=======
        allowNull: false
    },
>>>>>>> b97431cde40d539c9da5b177e0842a8c63c20ef8
});

module.exports = User;
