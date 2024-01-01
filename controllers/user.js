const User = require('../models/user')

const getAllUsers = (async (req, res) => {
    try {
      const users = await User.find({})
      res.status(201).json({users})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })
  
  const createUser = (async (req, res) => {
    try {
      const pl = await User.create(req.body)
      res.status(201).json({pl})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })
  
  const getUser = (async (req, res) => {
    try {
      const id = req.params.id
      const user = await parkingLot.findById(id)
      res.status(201).json({user})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })
  
  const updateUser = (async (req, res) => {
    res.status(200).json({ msg : 'Hey man' })
  })
  
  const deleteUser = (async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.deleteOne(id)
      res.status(201).json({user})
    } catch (error) {
      res.status(500).json({msg : error})
    }
  })

  
module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}