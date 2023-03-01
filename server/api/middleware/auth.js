const {
  models: { User },
} = require('../../db');
const { decodeToken } = require('../../utils');

// Authorization token middleware. It allows you to
// validate User's HTTP calls. This middleware attaches authorized user data to req.user.
const requireToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = decodeToken(authorization);
    const user = await User.findByPk(id);
    // attach user data to req if successfully authenticated.
    if (user) {
      req.user = user;
      next();
      return;
    }
    res.sendStatus(401);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };
