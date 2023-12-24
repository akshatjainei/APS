const express = require('express')
const router = express.Router()

const {
  getAllParkingLot,
  createParkingLot,
  getParkingLot,
  updateParkingLot,
  deleteParkingLot,
} = require('../controllers/parkingLot')

router.route('/').get(getAllParkingLot).post(createParkingLot)
router.route('/:id').get(getParkingLot).patch(updateParkingLot).delete(deleteParkingLot)

module.exports = router