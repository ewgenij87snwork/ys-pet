const likesService = require('../services/likes.service');

const updateLikes = async (req, res, next) => {
  const options = {
    postId: req.body.postId,
    userId: req.body.userId,
  };

  try {
    const result = await likesService.updateLikes(options);

    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateLikes,
};
