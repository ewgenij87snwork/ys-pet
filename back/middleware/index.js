const { v4: uuidv4 } = require('uuid');

const injectRequestId =
  (identity = 'some_one') =>
  (req, res, next) => {
    req.requestId = `${identity}-${uuidv4()}`;
    res.setHeader('x-requestid', req.requestId);
    next();
  };

module.exports = {
  injectRequestId,
};
