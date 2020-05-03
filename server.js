require("dotenv").config();

/* Libraries */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

/* Constants */
const app = express();
const port = process.env.PORT || 8080;

/* Database */
const usersRoutes = require('./routes/usersRoutes');
const userServiceFactory = require('./service/usersService');
const usersRepositoryFactory = require('./repository/usersRepository');

const usersRepository = usersRepositoryFactory(db);
const userService = userServiceFactory(usersRepository);

/* Middleware */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
// app.set('view engine','ejs');

/* Routes */
app.use("/users",usersRoutes(userService));

/* Endpoints */
app.get('/', (req, res)=>{
  res.end('THIS IS THE ROOT')
  console.log("hi")
});

/* Sever start */
app.listen(port, ()=> {
  console.log('Listening on', port);
})


//test

// app.get('/:name', (req, res)=>{
//   const name = req.params.name;
//   console.log(name)
//   const qs = `INSERT INTO users (id,name) VALUES ($1,$2);`
//   db.query(qs, [12,name])
//   res.end(name)
// })
