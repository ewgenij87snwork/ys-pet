const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikesSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    required: [true, 'Post ID required'],
    ref: 'Posts'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID required'],
    ref: 'Users'
  }
})

const Likes = mongoose.model('Likes', LikesSchema);

module.exports = { Likes };
