const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signToken(payload) {
  return jwt.sign(payload, config.jwtSecret);
}

module.exports = signToken;
