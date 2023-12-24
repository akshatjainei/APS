const express = require('express')
const app = express()
const parkingLot = require('./routes/parkingLot');
const connectDB = require('./db/connect');


app.use(express.json());

app.use('/api/v1/parkingLot', parkingLot);


const PORT = process.env.PORT || 3300

app.get('/' , (req, res)=>{
    res.send('hey')
})

app.listen(PORT , (req , res)=>{
    console.log(`Server running at ${PORT}`)
})