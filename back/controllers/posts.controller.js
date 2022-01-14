const postsService = require('../services/posts.service');

const getPostsList = async (req, res) => {
  const { logger, requestId } = req;
  logger.info('[getPostsList] requested', { requestId });

  let options = req.query;

  try {
    const result = await postsService.getPostsList(options, { logger: req.logger });

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    logger.error('Get Posts List: error occurred', { err, requestId });
    res.status(500).send({ status: 500, error: err?.message || 'Get Posts List: error occurred' });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await postsService.getPostById(postId);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    res.status(500).send({ status: 500, error: err?.message || 'Find Post: error occurred' });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const options = req.body;

  try {
    const result = await postsService.updatePost(postId, options);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    res.status(500).send({ status: 500, error: err?.message || 'Update Post: error occurred' });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  try {
    const result = await postsService.createPost(post);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    res.status(500).send({ status: 500, error: err?.message || 'Create Post: error occurred' });
  }
};

const deletePost = async (req, res) => {
  const postId = req.query.postId;

  try {
    const result = await postsService.deletePost(postId);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    res.status(500).send({ status: 500, error: err?.message || 'Delete Post: error occurred' });
  }
};

const getPostsByTag = async (req, res) => {
  const options = req.query;

  try {
    const result = await postsService.getPostsByTag(options);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 500, error: err?.message || 'Find Posts by Tag: error occurred' });
  }
};

module.exports = {
  getPostsList,
  getPostById,
  createPost,
  deletePost,
  getPostsByTag,
  updatePost,
};
