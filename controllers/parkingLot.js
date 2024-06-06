const parkingLot = require('../models/parkingLot.js')
const sourceModel = require('../cvapi.js')
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
  try{
    const sourceData = callFastAPI
    if(!sourceData){
      console.log('cv_model not running')
      return
    }
    const newCount = Math.floor(Math.random(0,10))
    const targetData = await parkingLot.findOne()
    if (targetData) {
      targetData.count = newCount
      await targetData.save()
      console.log(`Updated TargetModel parameter to ${newValue}`)
    } else {
      console.log('No data found in TargetModel')
    }
  }
  catch(Error){
    console.error(Error)
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