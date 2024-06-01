const mongoose = require('mongoose')

const User = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'must provide email'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  displayName: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
})

module.exports = mongoose.model('userInfo', User)