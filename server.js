require("dotenv").config();

/* Libraries */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
// db.connect();

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

/* Constants */
const app = express();
const PORT = process.env.PORT || 8080;


/* Middleware */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
// app.set('view engine','ejs');


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

app.get('/:name', (req, res)=>{
  const name = req.params.name;
  console.log(name)
  const qs = `INSERT INTO users (username) VALUES ($1);`
  db.query(qs, [name])
  res.end(name)
})
