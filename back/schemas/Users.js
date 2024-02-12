const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [3, 'Min 3 characters'],
    maxlength: [30, 'Max 30 characters'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },

  password: {
    type: String,
    require: [true, 'Password is required'],
    minlength: [6, 'Min 6 characters']
  },

  avatar: {
    type: String,
    default: 'self_improvement'
  }
})

const Users = mongoose.model('Users', UsersSchema);
module.exports = { Users };

