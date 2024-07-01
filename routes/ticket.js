const express = require('express')
const router = express.Router()

const {
  getAllTickets,
  createTicket,
  getTicket,
  deleteTicket,
} = require('../controllers/ticket')

router.route('/').get(getAllTickets).post(createTicket)
router.route('/:id').get(getTicket).delete(deleteTicket)

module.exports = router