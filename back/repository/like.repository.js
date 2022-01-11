const Likes = require('../schemas/Likes');
const Posts = require('../schemas/Posts');

class LikeRepository {
  constructor(options) {
    this.likeModel = options.likeModel;
    this.postModel = options.postModel;
    this.userModel = options.userModel;
  }

  async updateLikes(options) {
    const { postId, userId } = options;

    const isLiked = await this.likeModel.findOne({ post: postId, user: userId });

    if (isLiked) {
      await this.postModel.findByIdAndUpdate(postId, {
        $inc: {
          likes: -1,
        },
      });
      await this.likeModel.deleteOne({
        $and: [{ post: postId }, { user: userId }],
      });
    }

    if (!isLiked) {
      await this.postModel.findByIdAndUpdate(postId, {
        $inc: {
          likes: 1,
        },
      });
      await new this.likeModel({ post: postId, user: userId }).save();
    }

    return await this.postModel.findOne({ postId }, { likes: 1, _id: 0 });
  }
}

module.exports = new LikeRepository({
  likeModel: Likes,
  postModel: Posts,
});
