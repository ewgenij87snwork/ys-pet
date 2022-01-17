const { v4: uuidv4 } = require('uuid');
const { tokenDriver } = require('../drivers/token');
const userRepository = require('../repository/user.repository');

const injectRequestId =
  (identity = 'some_one') =>
  (req, res, next) => {
    req.requestId = `${identity}-${uuidv4()}`;
    res.setHeader('x-requestid', req.requestId);
    next();
  };

const auth = async (req, res, next) => {
  try {
    const requesterToken = req.headers['x-auth-header'];
    if (!requesterToken) throw Error('No Auth Token');

    const { _id } = tokenDriver.verify(requesterToken);

    const userCurrentToken = await userRepository.getUserToken(_id);

    if (userCurrentToken !== requesterToken) {
      throw Error('Wrong Auth token');
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  injectRequestId,
  auth,
};
