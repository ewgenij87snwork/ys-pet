const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jsonSecret = process.env.JSON_SECRET;

const tokenDriver = {
  sign: options => {
    console.log(jsonSecret);
    return jsonwebtoken.sign(options, 'jsonSecret');
  },
  verify: (token, ctx) => {
    try {
      const decoded = jsonwebtoken.verify(token, jsonSecret);
      ctx.logger.info('Successfully decoded', { decoded });
      return decoded;
    } catch (err) {
      ctx.logger.error('Filed to verify token', err);
      throw err;
    }
  },
};

module.exports = {
  hash: bcrypt,
  tokenDriver,
};
