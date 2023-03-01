//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Item = require("./models/Item");
const Item_Order = require("./models/ItemOrder");
const Order = require("./models/Order");
//associations could go here!
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Item, { through: Item_Order });
Item.belongsToMany(Order, { through: Item_Order });
Item.hasMany(Item_Order);
Item_Order.belongsTo(Item);
Order.hasMany(Item_Order);
Item_Order.belongsTo(Order);

module.exports = {
  db,
  models: {
    User,
    Item,
    Item_Order,
    Order,
  },
};
