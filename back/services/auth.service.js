const userRepository = require('../repository/user.repository');
const { tokenDriver } = require('../drivers/token');

const signup = async (options, ctx) => {
  const user = await userRepository.signup(options, ctx);

  return {
    status: 201,
    data: user,
  };
};

const login = async options => {
  const user = await userRepository.findByAuth(options);

  const token = tokenDriver.sign({
    _id: user.id,
    name: user.name,
  });

  await userRepository.saveToken(user._id, token);

  return {
    status: 200,
    data: { token },
  };
};

const logout = async userId => {
  await userRepository.deleteToken(userId);
  return {
    status: 200,
  };
};

module.exports = {
  signup,
  login,
  logout,
};
