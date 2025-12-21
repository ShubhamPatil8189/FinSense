const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWTSecret, {
    expiresIn: '30d',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWTSecret);
};

module.exports = { generateToken, verifyToken };