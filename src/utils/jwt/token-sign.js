const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signVerify(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = signVerify;
