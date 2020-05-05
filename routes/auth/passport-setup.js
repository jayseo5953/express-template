const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy({
    //options for the google stategy
  }),() =>{
    //passport callback function
  }
)