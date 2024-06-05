const connectDB = require('./db/connect');
const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
const passport = require('passport')
const parkingLot = require('./routes/parkingLot');
require('./auth')
require('dotenv').config()
const callFastAPI = require('./cvapi')


app.use(express.json());
app.use(express.static (path.join(__dirname,'public')))
app.use('/api/v1/parkingLot', parkingLot);


const PORT = process.env.PORT || 3300

app.get('/' , (req, res)=>{
    res.sendFile('index.html')
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/v1/parkingLot',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure',(req, res)=>{
    res.status(500).json({msg : 'gadbad hogyi bhai'})
})

const start = async ()=>{
    try {
        connectDB(process.env.MONGO_URI)
        const space = await callFastAPI
        console.log('Total empty parking slots :', space.count)
        let rand = 0
        for(let i = 0 ; i < space.list.length ; i++){
            rand =  Math.floor(Math.random() * i);
        }
        console.log('Assigned Parkign Lot number :',space.list[rand])
        app.listen(PORT , (req , res)=>{console.log(`Server running at ${PORT}`)})
    } catch (err) {
        console.log(err)
    }
}

start()