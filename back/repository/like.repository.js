const { Types } = require('mongoose');
const Likes = require('../schemas/Likes');
const Posts = require('../schemas/Posts');
const Users = require('../schemas/Users');

class LikeRepository {
  constructor(options) {
    this.likeModel = options.likeModel;
    this.postModel = options.postModel;
    this.userModel = options.userModel;
  }

  async updateLikes(options) {
    return new Promise(async resolve => {
      let { postId, userId } = options;
      const likesSum = await this.postModel.findById(postId);

      if (!userId || userId === '38457someUserId') {
        const user = await this.userModel.findOne({ name: 'randomUser' });
        userId = Types.ObjectId(user._id);
      }

      const isLiked = await this.likeModel.findOne({ post: postId, user: userId });

      if (isLiked) {
        await this.likeModel.deleteOne({
          $and: [{ post: postId }, { user: userId }],
        });

        await this.postModel
          .findByIdAndUpdate(postId, {
            $set: {
              likes: likesSum.likes - 1,
            },
          })
          .then(async res => {
            return resolve(await this.postModel.findById(postId));
          });
      }

      if (!isLiked) {
        await this.postModel
          .findByIdAndUpdate(postId, {
            likes: likesSum.likes ? likesSum.likes + 1 : 1,
          })
          .then(async res => {
            await new this.likeModel({ post: postId, user: userId }).save();
            return resolve(await this.postModel.findById(postId));
          });
      }
    });
  }
}

module.exports = new LikeRepository({
  likeModel: Likes,
  postModel: Posts,
  userModel: Users,
});
