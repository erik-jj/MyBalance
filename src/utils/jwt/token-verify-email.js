const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function tokenVerifyAccount(token) {
  return jwt.verify(token, config.jwtSecretVerify);
}

module.exports = tokenVerifyAccount;
