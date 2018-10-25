require('dotenv').config();

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');

const app = express();

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
app.use('/', (err, req, res, next) => next());

// Set directory for express

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// set cookie parser
app.use(cookieParser());

// For self-signed certificate.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Register routes. Loaded main route. Index route loads other routes.
app.use(require('./index.route'));

// Start listening server
server.listen(process.env.PORT, () => console.log(`server started on ${process.env.PORT}`));

app.get('/page', ({ cookies }, res) => {
    if (cookies && cookies.userData) {
        return res.send('worked');
    }

    return res.redirect('./auth/google');
});
