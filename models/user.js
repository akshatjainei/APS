const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'must provide email'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
})

module.exports = mongoose.model('userInfo', Schema)