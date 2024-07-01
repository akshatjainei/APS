const Ticket = require('../models/ticket')

const getAllTickets = (async (req, res) => {
    try {
      const ticket = await Ticket.find({})
      res.status(201).json({ticket})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })
  
  const createTicket = (async (req, res) => {
    try {
      const pl = await Ticket.create(req.body)
      res.status(201).json({pl})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })
  
  const getTicket = (async (req, res) => {
    try {
      const id = req.params.id
      const user = await Ticket.findById(id)
      res.status(201).json({user})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })
  
  
  const deleteTicket = (async (req, res) => {
    try {
      const id = req.params.id
      const user = await Ticket.deleteOne(id)
      res.status(201).json({user})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })

  
module.exports = {
    getAllTickets,
    createTicket,
    getTicket,
    deleteTicket,
}