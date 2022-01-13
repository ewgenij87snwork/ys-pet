const postRepository = require('../repository/post.repository');

const getPostsList = async options => {
  const {
    sort = {
      field: 'title',
      order: 1,
    },
    skip = 0,
    limit = 7,
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

const getPostById = async postId => {
  const post = await postRepository.getPostById(postId);

  return {
    status: 200,
    data: post,
  };
};

const updatePost = async (postId, options) => {
  const post = await postRepository.updatePost(postId, options);

  return {
    status: 200,
    data: post,
  };
};

const createPost = async post => {
  const newPost = await postRepository.createPost(post);

  return {
    status: 201,
    data: newPost,
  };
};

const deletePost = async postId => {
  const deletedPost = await postRepository.deletePost(postId);

  return {
    status: 200,
    data: deletedPost,
  };
};

const getPostsByTag = async options => {
  const foundPosts = await postRepository.getPostsByTag(options);

  return {
    status: 200,
    data: foundPosts,
  };
};

module.exports = {
  getPostsList,
  getPostById,
  createPost,
  deletePost,
  getPostsByTag,
  updatePost,
};
