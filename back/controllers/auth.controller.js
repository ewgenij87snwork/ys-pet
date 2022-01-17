const authService = require('../services/auth.service');

const login = async (req, res) => {
  const options = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const data = await authService.login(options, { logger: req.logger });
    res.status(data.status).json(data);
  } catch (e) {
    req.logger.error('Login failed', e);
    return res.status(500).send({
      error: e || 'Something went wrong.',
    });
  }
};

const logout = async (req, res) => {
  const userId = req.body.userId;

  try {
    const data = await authService.logout(userId, { logger: req.logger });
    res.status(data.status).send();
  } catch (e) {
    req.logger.error('Logout failed', e);
    return res.status(500).send({
      error: e || 'Something went wrong.',
    });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body.data;
  const options = { name, email, password };

  try {
    const data = await authService.signup(options, { logger: req.logger });
    res.status(data.status).json(data);
  } catch (e) {
    req.logger.error('Signup failed', e);
    return res.status(500).send({
      error: e || 'Something went wrong.',
    });
  }
};

module.exports = {
  login,
  logout,
  signup,
};
