const parkingLot = require('../models/parkingLot.js')
const getAllParkingLot = (async (req, res) => {
  try {
    const parkingLots = await parkingLot.find({})
    res.status(201).json({parkingLots})
  } catch (error) {
    res.status(500).json({msg : error})
  }
})

const createParkingLot = (async (req, res) => {
  try {
    const pl = await parkingLot.create(req.body)
    res.status(201).json({pl})
  } catch (error) {
    res.status(500).json({msg : error})
  }
})

const getParkingLot = (async (req, res) => {
  try {
    const id = req.params.id
    const oneParkingLot = await parkingLot.findById(id)
    res.status(201).json({oneParkingLot})
  } catch (error) {
    res.status(500).json({msg : error})
  }
})

const updateParkingLot = (async (req, res) => {
  res.status(200).json({ msg : 'Hey man' })
})

const deleteParkingLot = (async (req, res) => {
  try {
    const id = req.params.id
    const oneParkingLot = await parkingLot.deleteOne(id)
    res.status(201).json({oneParkingLot})
  } catch (error) {
    res.status(500).json({msg : error})
  }
})

module.exports = {
    getAllParkingLot,
    createParkingLot,
    getParkingLot,
    updateParkingLot,
    deleteParkingLot,
}