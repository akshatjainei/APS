const callFastAPI = require('../cvapi.js')
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
  const { id: taskID } = req.params;
  const space = await callFastAPI()
  const newCount = space.count
  try {
    const task = await parkingLot.findOneAndUpdate(
      { _id: taskID },
      { count : newCount},
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404));
    }

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
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