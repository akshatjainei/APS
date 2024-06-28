require('./config/auth')
require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const crypto = require('crypto')
const { updateParkingLot } = require('./controllers/parkingLot')
const authRoutes = require('./routes/auth')
const passport = require('passport')
const session = require('express-session')
const cron = require('node-cron')
const parkingLot = require('./routes/parkingLot')
const callFastAPI = require('./cvapi')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const fs = require('fs');
const connectDB = require('./db/connect')

const secret_key = crypto.randomBytes(64).toString('hex');

app.use(express.json());
app.use(express.static (path.join(__dirname,'public')))
app.use('/api/v1/parkingLot', parkingLot);
app.use(session({ secret: secret_key , resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3300

app.get('/' , (req, res)=>{
    res.sendFile('index.html')
})

app.get('/success' , (req , res)=>{
  res.sendFile(path.join(__dirname, './public', 'success.html'))
})

app.get('/parkingLot' , (req , res)=>{
  res.sendFile(path.join(__dirname, './public', 'parkinglots.html'))
})
  
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
      await app.patch('./api/v1/parkingLot/6661c0fd89a9a279105bb87e' , updateParkingLot)
      await connectDB(uri)
        const space = await callFastAPI()
        console.log('Total empty parking slots :', space.count)
        console.log('Assigned Parkign Lot number :',space.list[0])
        app.listen(PORT , (req , res)=>{console.log(`Server running at http://localhost:${PORT}`)})
    } catch (err) {
        console.log(err)
    }
}

start()