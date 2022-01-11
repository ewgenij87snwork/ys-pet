const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title required'],
    },

    subtitle: {
      type: String,
      required: [true, 'Subtitle required'],
    },

    text: {
      type: String,
      required: [true, 'Text required'],
    },

    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author required'],
      ref: 'Users',
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tags',
      },
    ],

    likes: {
      type: Number,
    },

    updatedAt: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Posts', PostsSchema);
