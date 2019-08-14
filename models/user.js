const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "userName required"]
  },
  password: {
    type: String,
    required: [true, "password required"]
  }
});

// will be in the 'product' collection
const user = mongoose.model('user', userSchema);

module.exports = user;
