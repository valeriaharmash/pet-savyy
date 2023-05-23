const { Sequelize } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    isIn: ['complete', 'in progress'],
    defaultValue: 'in progress',
  },
  paymentId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  recipientName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
});

Order.prototype.getTotal = function () {
  return this.items.reduce((acc, item) => acc + (item.price * item.Item_Order.qty), 0);
};


module.exports = Order;
