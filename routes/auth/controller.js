const router = require("express").Router();
const passport = require("passport");

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
  router.post('/login',(req,res)=>{
    res.send('login')
  })
  router.post('/logout',(req,res)=>{
    res.send('logout')
  })
  router.post('/google',(req,res)=>{
    res.send('google')
  })
  return router;
}