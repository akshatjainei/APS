const User = require('./models/user')
const passport = require('passport')
require('dotenv').config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3300/api/v1/parkingLot",
    passReqToCallback   : true
  },(request, accessToken, refreshToken, profile, done)=>User.findOne({ googleId: profile.id }, (err, user) => {
    if (err) {
        return done(err);
    }
    if (!user) {
        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
        });
        newUser.save((err) => {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    } else {
        return done(null, user);
    } 
  })
))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user , done)=>{
  User.findById(id, (err, user) => {
    done(err, user);
  });
})