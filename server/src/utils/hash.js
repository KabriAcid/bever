const argon2 = require("argon2");

async function hash(password) {
  return argon2.hash(password);
}

async function verify(hashStr, password) {
  try {
    return await argon2.verify(hashStr, password);
  } catch (e) {
    return false;
  }
}

module.exports = { hash, verify };
