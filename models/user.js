const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String
});

const User = mongoose.model('User', Schema);

module.exports = User;
