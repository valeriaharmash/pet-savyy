const {
  hashPassword,
  generateToken,
  decodeToken,
  verifyPassword,
} = require('./auth');

module.exports = { hashPassword, generateToken, decodeToken, verifyPassword };
