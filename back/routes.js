module.exports = function (app) {
  app.use('/api/posts', require('./routes/posts.route'));
};
