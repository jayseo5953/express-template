const router = require("express").Router();
const passport = require("passport");
const passportSetup = require('../../config/passport-setup')

module.exports = service => {
  passportSetup(service);
 
  router.get('/', async (req,res)=>{
    console.log("I am in Auth")
    try {
      const result = await service.getAllUsers();
      res.send(result.rows)
    }
    catch (err) {
      console.error(err);
    }
  });
  router.get('/login',(req,res)=>{
    res.send('login')
  })
  router.get('/logout',(req,res)=>{
    //this req.user is from deserialize done(null, user)
    console.log('======user from /logout=======')
    console.log(req.user)
    console.log("=======session from /logout========")
    console.log(req.session)
    req.logout()
    res.send('sucessfully logged out')
  })


// Google Oauth  
  router.get('/google',passport.authenticate("google",{
    scope:['profile','email'], // specify data you want, there are others
  }))


  router.get('/google/redirect',
    passport.authenticate("google",{
     failureRedirect:"http://localhost:3000/login/"
    }), async(req,res)=>{
      //this req.user is from GoogleStrategy done(null,user)
      
      console.log("====req.user from google/redirect=======")
      console.log(req.user)
      console.log("====req.session from google/redirect=======: ")
      console.log(req.session)
      res.redirect(`http://localhost:3000/users?username=${req.user.username}&email=${req.user.email}`)
    })

  return router;
}