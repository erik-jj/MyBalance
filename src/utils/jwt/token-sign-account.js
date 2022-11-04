const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signTokenAccount(payload) {
  return jwt.sign(payload, config.jwtSecretAccount, { expiresIn: '5min' });
}

module.exports = signTokenAccount;
