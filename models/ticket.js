const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userEmail: String,
    ticketId: String,
    qrCode: String
  });
  
const Ticket = mongoose.model('Ticket', ticketSchema);