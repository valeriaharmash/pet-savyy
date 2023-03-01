const router = require('express').Router();
const { models: {Item} } = require("../../db")

router.get('/:itemId', async (req, res, next) => {
  try {
		const {itemId} = req.params
    const item = await Item.findOne({
      where: {
        id: itemId,
      },
    });

    if (item) {
      res.send(item);
      return;
    }
    res.status(404).send("Item doesn't exist.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
