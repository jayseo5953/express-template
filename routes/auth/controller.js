const router = require("express").Router();
const passport = require("passport");
const passportSetup = require('../../config/passport-setup')

module.exports = service => {
  passportSetup(service);
 
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
    // req.logout()
    console.log('logout!!', req.user)
    console.log("session  from logout: ",req.session)
    res.redirect("http://localhost:3000/login");
  })


// Google Oauth  
  router.get('/google',passport.authenticate("google",{
    scope:['profile','email'], // specify data you want, there are others
  }),(req,res)=>{console.log("session1: ", req.session)})


  // router.get(`/google`, (req, res, next) => {
  //   const authenticator = passport.authenticate("google", {
  //     scope: ["profile","email"],
  //   });
  //   console.log("reqreq user: ", req.user);
  //   console.log("reqreq session: ", req.session)
  //   authenticator(req, res, next);
  // });


  router.get('/google/redirect',passport.authenticate("google",{
    failureRedirect:"http://localhost:3000/login/"}), async(req,res)=>{
      // console.log("req.query", req.user)
      console.log("session2: ",req.session )
      res.redirect("http://localhost:3000/users")
    })

  // router.get('/google/redirect', (req, res, next) => {
  //   passport.authenticate("google",(err, user, info) => {
  //     req.logIn(user,(err)=>{
  //       res.redirect('http://localhost:3000/users')
  //     })
  //   })(req, res, next)
  // })

  return router;
}