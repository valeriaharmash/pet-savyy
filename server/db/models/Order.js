const { Sequelize } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	total: {
		type: Sequelize.FLOAT,
		defaultValue: 0,
		allowNull: false,
	},
	status: {
		type: Sequelize.STRING,
		isIn: ['complete', 'in progress'],
	},
	paymentId: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	shippingAddress: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
		  notEmpty: true,
		},
	  },
});

module.exports = Order;
