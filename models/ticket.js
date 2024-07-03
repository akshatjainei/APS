const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    parkingSpot :{type : Number},
    timestamp : { type: Number, default: (new Date()).getTime() }
  });
  
const Ticket = mongoose.model('Ticket', Schema);

module.exports = Ticket