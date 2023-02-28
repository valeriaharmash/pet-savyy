require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Reusable encrypt/decrypt helper functions.

const SALT_ROUNDS = 5;

const hashPassword = async (password) =>
  await bcrypt.hash(password, SALT_ROUNDS);

const verifyPassword = async (target, actual) =>
  await bcrypt.compare(actual, target);

const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT);

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT);
};

module.exports = { hashPassword, verifyPassword, generateToken, decodeToken };
