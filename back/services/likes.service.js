const likeRepository = require('../repository/like.repository');

const updateLikes = async options => {
  const likesSum = await likeRepository.updateLikes(options);

  return {
    status: 200,
    data: likesSum,
  };
};

module.exports = {
  updateLikes,
};
