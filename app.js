const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
const crypto = require('crypto')
const passport = require('passport')
const session = require('express-session')
const cron = require('node-cron')
const parkingLot = require('./routes/parkingLot')
require('./auth')
require('dotenv').config()
const callFastAPI = require('./cvapi')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const fs = require('fs');
const mongoose = require('mongoose')
const connectDB = require('./db/connect')


const secret_key = crypto.randomBytes(64).toString('hex');

app.use(express.json());
app.use(express.static (path.join(__dirname,'public')))
app.use('/api/v1/parkingLot', parkingLot);
app.use(session({ secret: secret_key , resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3300

app.get('/test',(req,res)=>{
    res.sendFile(path.join(__dirname, './public', 'standard.html'))
})

app.get('/' , (req, res)=>{
    res.sendFile('index.html')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('http://localhost:3300/api/v1/parkingLot');
    }
  );
  
  async function createPaymentLink() {
    let stripeData;
    try {
      stripeData = JSON.parse(fs.readFileSync('stripe_data.json', 'utf8'));
    } catch (err) {
      console.error('Error reading stripe_data.json:', err);
      return;
    }
  
    if (!stripeData.paymentLinkUrl) {
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: stripeData.priceId,
            quantity: 1,
          },
        ],
        after_completion: {
          type: 'redirect',
          redirect: {
            url: 'https:/localhost:3300/payment-success',
          },
        },
      });
  
      stripeData.paymentLinkUrl = paymentLink.url;
      fs.writeFileSync('stripe_data.json', JSON.stringify(stripeData, null, 2));
      console.log('Payment link created and stored:', paymentLink.url);
    } else {
      console.log('Using existing payment link:', stripeData.paymentLinkUrl);
    }
  
    return stripeData.paymentLinkUrl;
  }
  
  createPaymentLink().then(paymentLink => {
    console.log('Send this payment link to your customers:', paymentLink);
  });

const start = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI, {
          })
          .then(() => console.log('MongoDB connected'))
          .catch(err => console.log(err));
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