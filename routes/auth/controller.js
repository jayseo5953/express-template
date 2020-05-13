const router = require("express").Router();
const passport = require("passport");
const passportSetup = require('../../config/passport-setup')
const bcrypt = require('bcrypt');

module.exports = service => {
  passportSetup(service);

  const checkAuthenticated = (req,res,next) => {
    // this is for homepage
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect("http://localhost:3000/login")
    }
  }
  const checkNotAuthenticated = (req,res,next) => {
    // this is for login, registser
    if (req.isAuthenticated()) {
      res.redirect("http://localhost:3000")
    } else {
      return next()
    }
  }
 
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

  router.post('/register', async (req,res)=>{
    console.log("register")
    console.log("req.user from /register: ",req.user)
    console.log("submiited value: ",req.body)
    // res.send('register')
    try {
      let user = {...req.body};
      
      //bcrypt PW
      const hashedPW = await bcrypt.hash(user.password,10);
      user.password = hashedPW
      
      console.log("Creating user... ",user)
       
      const result = await service.createUserWithEmailPW(user);
      // console.log("Result of createwithemail: ", result)
      if (result == "userExists") {
        res.status(400).send('Email Already Exists');
      }
      res.send(result);
    }
    catch (err) {
      // set statuscode later
      // console.log("errrrrr", err)
      throw new Error('ERR FROM /register: '+ err)
    }
  });


  router.post('/login',passport.authenticate('local'),(req,res)=>{
    console.log("req.user from /login: ", req.user)
    console.log("submiited value: ",req.body)

    res.send(req.user)
  })

  router.get('/check',(req,res)=>{
    console.log('check req.user', req.user)
    console.log('check req.session', req.session)
    console.log("this is a test")
    res.send('halo')
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