const router = require('express').Router();
const {
  models: { User },
} = require('../../db');

// POST /api/signup
router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
