const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function tokenVerifyRecovery(token) {
  return jwt.verify(token, config.jwtSecretRecovery);
}

module.exports = tokenVerifyRecovery;
