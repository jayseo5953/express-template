const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

// console.log("client id: ", process.env.CLIENT_ID)
// console.log("client secret: ", process.env.CLIENT_SECRET)

module.exports = service =>{

  
  passport.serializeUser((user,done)=> {
    console.log("userid: ",user.id)
    //Serialzer speicifies which data of user to store as a cookie
    done(null,user.id);
  })

  passport.deserializeUser(async(id,done)=> {
    try {
      // Deserializer take id from the session and use it to find the entire object
      const result = await service.findUserById(id);
      const user = result.rows[0];
      console.log("deserialized!: ", user)
      // And make the object avaiable in the "subsequent" requests as req.user
      done(null, user)
    }
    catch (err) {
      console.error("err from serializer ",err)
    }
  })

  passport.use(
    new GoogleStrategy({
      //options for the google stategy
      callbackURL:'http://localhost:3001/auth/google/redirect',
      clientID:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
    }, async (accessToken, refreshToken, profile, done) =>{
      //passport callback function
      console.log("passport callback fired!")
      // console.log("passport brought back: ")
      // console.log(profile);
      try {
        const user = await service.authWith_g_id(profile);
        // console.log("G AUTH DB QUERY RESULT: ", user);

        //this is what is being sent to the serializeUser and also in /redirect as req.user
        done(null, user);
      }
      catch (err) {
        console.error(err)
      }
    }
  ))
  return passport
}