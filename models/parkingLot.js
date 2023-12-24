const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  status: {
    type: Boolean,
    default: false,
  },
  address:{
    type : String,
    required: [true, 'must provide name'],
    maxlength: [100, 'name can not be more than 20 characters'],
  }
})

module.exports = mongoose.model('parkingLotInfo', Schema)