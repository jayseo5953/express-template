require("dotenv").config();

/* Libraries */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const { Pool } = require('pg');
const dbParams = require('./config/db');
const db = new Pool(dbParams);
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const flash = require('express-flash');

/* Constants */
const app = express();
const PORT = process.env.PORT || 8080;

/* Middleware */

// app.set('view engine','ejs');
app.use(morgan('dev'));
// app.use(cookieParser()) // this or cookieSession
const corsOptions = {
  credentials: true,
  origin: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(flash());
app.use(cookieSession({
  // httpOnly:false,
  maxAge:24*60*60*1000,
  keys:[process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
const UserModule = require('./routes/users');
const AuthModule = require('./routes/auth');

app.use("/users",UserModule(db));
app.use("/auth", AuthModule(db))

/* Endpoints */
app.get('/', (req, res)=>{
  res.end('THIS IS THE ROOT')
  console.log("hi")
});

/* Sever start */
app.listen(PORT, ()=> {
  console.log('Listening on', PORT);
})

//test
// app.get('/:name', (req, res)=>{
//   const name = req.params.name;
//   console.log(name)
//   const qs = `INSERT INTO users (username) VALUES ($1);`
//   db.query(qs, [name])
//   res.end(name)
// })
