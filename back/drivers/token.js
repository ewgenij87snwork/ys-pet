const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jsonSecret = process.env.JWT_KEY;

const tokenDriver = {
  sign: options => {
    return jsonwebtoken.sign(options, '' + jsonSecret);
  },
  verify: token => {
    try {
      return jsonwebtoken.verify(token, '' + jsonSecret);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = {
  hash: bcrypt,
  tokenDriver,
};
