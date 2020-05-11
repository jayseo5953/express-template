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

  router.post('/register',(req,res)=>{
    console.log("register")
    console.log("req.user from /register: ",req.user)
    console.log("submiited value: ",req.body)
    res.send('register')
  })

  router.post('/login',(req,res)=>{
    console.log("login~~~")
    console.log("req.user from /login: ", req.user)
    console.log("submiited value: ",req.body)

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
     failureRedirect:"/"
    }), async(req,res)=>{
      //this req.user is from GoogleStrategy done(null,user)

      console.log("====req.user from google/redirect=======")
      console.log(req.user)
      console.log("====req.session from google/redirect=======: ")
      console.log(req.session)
      res.redirect('http://localhost:3000/profile')
    })
    
  router.get('/user',(req, res)=> {
    // console.log("user from /user: ", req.user)
    res.send(req.user)
  })
  return router;
}