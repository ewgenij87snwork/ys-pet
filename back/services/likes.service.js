const likeRepository = require('../repository/like.repository');

const updateLikes = async options => {
  await likeRepository.updateLikes(options);

  return {
    status: 200,
  };
};

module.exports = {
  updateLikes,
};
