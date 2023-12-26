const connectDB = require('./db/connect');
const express = require('express')
const app = express()
const parkingLot = require('./routes/parkingLot');
require('dotenv').config()


app.use(express.json());

app.use('/api/v1/parkingLot', parkingLot);


const PORT = process.env.PORT || 3300

app.get('/' , (req, res)=>{
    res.send('hey')
})


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , (req , res)=>{console.log(`Server running at ${PORT}`)})
    } catch (err) {
        console.log(err)
    }
}

start()