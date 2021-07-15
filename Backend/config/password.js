const crypto = require("crypto");

const genpassword = (password) => {
  var salt = crypto.randomBytes(32).toString("hex");
  var hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hash,
  };
};

const comparePassword = (password, hash, salt) => {
  var hashVirify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVirify;
};

module.exports = {
  genpassword,
  comparePassword,
};
