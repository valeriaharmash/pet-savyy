const { Sequelize } = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    isIn: ["complete", "in progress"],
  },
});

module.exports = Order;
