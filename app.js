const connectDB = require('./db/connect');
const express = require('express')
const app = express()
const path = require('path')
const passport = require('passport')
const cvapi = require('./cvapi')
const parkingLot = require('./routes/parkingLot');
require('./auth')
require('dotenv').config()


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
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , (req , res)=>{console.log(`Server running at ${PORT}`)})
    } catch (err) {
        console.log(err)
    }
}

start()