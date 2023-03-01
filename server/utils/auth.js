require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Reusable encrypt/decrypt helper functions.

const SALT_ROUNDS = 5;

const hashPassword = async (password) =>
  await bcrypt.hash(password, SALT_ROUNDS);

const verifyPassword = async (target, actual) =>
  await bcrypt.compare(actual, target);

const generateToken = (userId, type) => {
  if (type === 'admin') {
    return jwt.sign({ id: userId }, process.env.ADMIN_SECRET);
  } else {
    return jwt.sign({ id: userId }, process.env.CUSTOMER_SECRET);
  }
};

const decodeToken = (token, type) => {
  if (type === 'admin') {
    return jwt.verify(token, process.env.ADMIN_SECRET);
  } else {
    return jwt.verify(token, process.env.CUSTOMER_SECRET);
  }
};

module.exports = { hashPassword, verifyPassword, generateToken, decodeToken };
