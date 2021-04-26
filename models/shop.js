const { DataTypes } = require("sequelize");
const db = require("../db");

const ShopItem = db.define("shopItem", {
  title: {
    type: DataTypes.STRING(85),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
<<<<<<< HEAD
    type: DataTypes.ARRAY,
  }
=======
    type: DataTypes.STRING,
    allowNull: false
}
>>>>>>> b97431cde40d539c9da5b177e0842a8c63c20ef8
});

module.exports = ShopItem;