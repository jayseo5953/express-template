const express = require("express");
const router = express.Router();
// const passport = require("passport");

module.exports = service => {
  router.get('/', async (req,res)=>{
    console.log("I am in USERS")
    try {
      const result = await service.getAllUsers();
      console.log(result.rows);
      res.send(result.rows)
    }
    catch (err) {
      console.error(err);
    }
  });
  return router;
}