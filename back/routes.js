module.exports = function (app) {
  app.use('/api/posts', require('./routes/posts.route'));
  app.use('/api/likes', require('./routes/likes.route'));
};
