const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signTokenAccount(payload) {
  return jwt.sign(payload, config.jwtSecretAccount, { expiresIn: '60min' });
}

module.exports = signTokenAccount;
