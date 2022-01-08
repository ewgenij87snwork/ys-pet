const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  title: String,
});

const Tags = mongoose.model('Tags', TagsSchema);

module.exports = { Tags };
