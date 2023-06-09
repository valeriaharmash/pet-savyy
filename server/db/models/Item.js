const { Sequelize } = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tag: {
    type: Sequelize.STRING,
    defaultValue: "misc",
    allowNull: false,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://heydjangles.com/wp-content/uploads/2020/08/halloween-costumes-for-chihuahuas-21-768x702.png",
  },
});

module.exports = Item;
