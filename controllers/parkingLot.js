const parkingLot = require('../models/parkingLot.js')
const getAllParkingLot = (async (req, res) => {
  res.status(200).json({ msg : 'Hey man' })
})

const createParkingLot = (async (req, res) => {
  res.status(200).json({ msg : 'Hey man' })
})

const getParkingLot = (async (req, res) => {
  res.status(200).json({ msg : 'Hey man' })
})

const updateParkingLot = (async (req, res) => {
  res.status(200).json({ msg : 'Hey man' })
})

const deleteParkingLot = (async (req, res) => {
  res.status(200).json({ msg : 'Hey man' })
})

module.exports = {
    getAllParkingLot,
    createParkingLot,
    getParkingLot,
    updateParkingLot,
    deleteParkingLot,
}