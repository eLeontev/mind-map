require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

const server = require('http').Server(app);

// MongoDB connection configuration
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL, {useMongoClient: true})
  .then((res) => {
    console.log(`----- Database connected on ${process.env.DB_URL} -----`);
  })
  .catch((err) => {
    console.log(`err connecting to db on ${process.env.DB_URL}, err: ${err}`);
  }); // connect to our database

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

// For self-signed certificate.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Register routes. Loaded main route. Index route loads other routes.
app.use(require('./index.route'));

//Start listening server
server.listen(process.env.PORT, () => {
  console.log(`-----------------------\nServer started successfully!, Open this URL ${process.env.BASE_URL}\n-----------------------`);
});
