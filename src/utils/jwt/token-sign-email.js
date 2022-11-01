const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signTokenAccount(payload) {
  return jwt.sign(payload, config.jwtSecretVerify);
}

module.exports = signTokenAccount;
