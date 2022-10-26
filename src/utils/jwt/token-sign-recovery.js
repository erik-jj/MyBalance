const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signTokenRecovery(payload) {
  return jwt.sign(payload, config.jwtSecretRecovery, { expiresIn: '15min' });
}

module.exports = signTokenRecovery;
