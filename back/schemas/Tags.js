const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  title: String,
  postsId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts'
    }
  ]
})

const Tags = mongoose.model('Tags', TagsSchema);

module.exports = { Tags }
