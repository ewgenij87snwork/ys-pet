const postsService = require('../services/posts.service');

const getPostsList = async (req, res, next) => {
  let options = req.query;

  try {
    const result = await postsService.getPostsList(options);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  let options = {
    postId: req.params.postId,
  };

  try {
    const result = await postsService.getPostById(options);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPostsList,
  getPostById,
};
