const router = require("express").Router();
const passport = require("passport");
const passportSetup = require('../../config/passport-setup')

module.exports = service => {
  router.get('/', async (req,res)=>{
    console.log("I am in Auth")
    try {
      const result = await service.getAllUsers();
      console.log(result.rows);
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
    res.send('logout')
  })

// Google Oauth
  passportSetup(service)
  
  router.get('/google',passport.authenticate("google",{
    scope:['profile','email'], // specify data you want, there are others
  }))

  router.get('/google/redirect',passport.authenticate("google"),(req,res)=>{
    console.log("====i am here=====")
    res.send('hihi')
    // res.redirect("http://localhost:3000")
  })


  return router;
}