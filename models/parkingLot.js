const mongoose = require('mongoose')
const cron =  require('node-cron')
const updateParkingLot = require('../updateParkingLot')

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
  },
  count:{
    type : Number,
    required : [true , 'Give initial number']
  }
})

cron.schedule('* * * * *', () => {
  console.log('Running updateParameter task');
  updateParkingLot()
});

module.exports = mongoose.model('parkingLotInfo', Schema)