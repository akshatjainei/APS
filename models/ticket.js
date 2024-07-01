const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    parkingSpot :{type : Number},
    timestamp : { type: Number, default: (new Date()).getTime() }
  });
  
const Ticket = mongoose.model('Ticket', ticketSchema);