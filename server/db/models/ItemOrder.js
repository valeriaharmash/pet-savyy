const { Sequelize } = require('sequelize');
const db = require('../db');

const Item_Order = db.define('Item_Order', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Item_Order;
