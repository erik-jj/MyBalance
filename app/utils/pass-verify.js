const bcrypt = require('bcrypt');

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = verifyPassword;
