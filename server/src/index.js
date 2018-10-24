require('dotenv').config();
const express = require('express');
let session = require('express-session');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
let cookieParser = require('cookie-parser')

const server = require('http').Server(app);

// // MongoDB connection configuration
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DB_URL, {useMongoClient: true}, (err, res) => {
//   if (err)
//     console.log(`err connecting to db on ${process.env.DB_URL}, err: ${err}`);
//   else
//     console.log(`----- Database connected on ${process.env.DB_URL} -----`);
// }); // connect to our database

// Set port
app.set('port', process.env.PORT || 8000);

// Allow cross origin
app.use(cors());

// Logger
app.use(morgan('dev'));

// Validate each call before route
app.use('/', function (err, req, res, next) {
  next();
});

// Set directory for express

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// set cookie parser
app.use(cookieParser());

// For self-signed certificate.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Register routes. Loaded main route. Index route loads other routes.
app.use(require('./index.route'));

//Start listening server
server.listen(process.env.PORT, () => console.log(`server started on ${process.env.PORT}`));

app.get('/page', ({ cookies }, res) => {
  if (cookies && cookies.userData) {
    return res.send('worked');
  };

  return res.redirect('./auth/google');
})