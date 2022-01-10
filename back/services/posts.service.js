const postRepository = require('../repository/post.repository');

const getPostsList = async options => {
  const {
    sort = {
      field: 'title',
      order: 1,
    },
    skip = 0,
    limit = 2,
  } = options;

  const data = await postRepository.getPostsList({
    sort,
    skip,
    limit,
  });

  return {
    status: 200,
    data: data,
  };
};

const getPostById = async options => {
  const post = await postRepository.getPostById(options);

  return {
    status: 200,
    data: post,
  };
};

module.exports = {
  getPostsList,
  getPostById,
};
