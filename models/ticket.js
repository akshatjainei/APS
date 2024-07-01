const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    parkingSpot : String,
    timestamp : Date,
  });
  
const Ticket = mongoose.model('Ticket', ticketSchema);