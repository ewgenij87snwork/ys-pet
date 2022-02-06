const { auth } = require('./middleware');
module.exports = function (app) {
  app.use('/api/posts', auth, require('./routes/posts.route'));
  app.use('/api/likes', auth, require('./routes/likes.route'));
  app.use('/api/auth', require('./routes/auth.route'));
};
