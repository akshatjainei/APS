const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
const passport = require('passport')
const cron = require('node-cron')
const parkingLot = require('./routes/parkingLot');
require('./auth')
require('dotenv').config()
const callFastAPI = require('./cvapi')
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const Razorpay  = require('razorpay')


app.use(express.json());
app.use(express.static (path.join(__dirname,'public')))
app.use('/api/v1/parkingLot', parkingLot);


const PORT = process.env.PORT || 3300

app.get('/test',(req,res)=>{
    res.sendFile(path.join(__dirname, './public', 'standard.html'))
})

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

var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
});

app.post('/create/orderId' , (req , res)=>{
    var options = {
        amount: 2,  
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        try {
            console.log(order);
            res.send({orderId : order.id});
        } catch (error) {
            console.error(error)
        }
    });
})


const start = async ()=>{
    try {
        const url = 'mongodb+srv://akshatjainei:V6ZFmbUCeRcO6Cs0@aps.axccqja.mongodb.net/?retryWrites=true&w=majority&appName=aps'
        const connectDB = (url)=>{
        return mongoose
            .connect(url)
            .then(()=>console.log('Connected to the DB'))
            .catch((err)=>console.log(err))
        }
        connectDB(url)
        const space = await callFastAPI()
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