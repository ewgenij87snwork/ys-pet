const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  title: {
    type: String,
    unique: true,
    index: true,
  },
});

module.exports = mongoose.model('Tags', TagsSchema);
