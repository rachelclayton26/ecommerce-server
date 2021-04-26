const {DataTypes} = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING("length", 100),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //Alec - we discussed doing the admin user like this, but admins could also be added to a different db once created as users, in case that's easier
    isAdmin:{
        type: DataType.BOOLEAN,
        defaultValue: false,
        allNull: false,
    }
});

module.exports = User;
