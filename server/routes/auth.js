const router = require('express').Router();
const {
  models: { User },
} = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send('Invalid email.');
      return;
    }
    if (!password) {
      res.status(400).send('Invalid password.');
      return;
    }
    res.send({ token: await User.authenticate({ email, password }) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email) {
      res.status(400).send('Invalid email.');
      return;
    }
    if (!password) {
      res.status(400).send('Invalid password.');
      return;
    }
    if (!firstName) {
      res.status(400).send('Invalid first name.');
      return;
    }
    if (!lastName) {
      res.status(400).send('Invalid last name.');
      return;
    }

    const user = await User.create({ email, password, firstName, lastName });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
