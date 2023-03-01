const router = require("express").Router();
// const { Item_Order, Order, Item, User } = require("../../db");
const {
  models: { User, Item_Order, Order, Item },
} = require("../../db");

//GET: /api/cart/orders
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Item_Order.findAll({
      include: [
        {
          model: Item,
        },
        {
          model: Order,
          include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
          ],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET: /api/cart/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const userOrder = await Item_Order.findAll({
      include: [
        {
          model: Item,
        },
        {
          model: Order,
          include: {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
          where: {
            userId: req.params.userId,
            status: "in progress",
          },
        },
      ],
    });
    res.json(userOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
