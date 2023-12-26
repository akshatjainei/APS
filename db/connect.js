const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://akshatjainei:GwXBESJeYJiJ0OK3@cluster0.jwrxgrf.mongodb.net/APS?retryWrites=true&w=majority'

const connectDB = (url)=>{
  return mongoose
  .connect(url)
  .then(()=>console.log('Connected to the DB'))
  .catch((err)=>console.log(err))
}

module.exports = connectDB

