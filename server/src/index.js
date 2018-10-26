require('dotenv').config();

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let { DB_URL } = require('../keys');
let cache = require('./cache');
let { checkUserMiddleware } = require('./auth/auth.controller');

const app = express();
const server = require('http').Server(app);

let PORT = process.env.PORT;

let startListenServer = () => (
    server.listen(
        PORT, 
        () => console.log(`server started on ${PORT}`)
    )
);

// MongoDB connection configuration
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useMongoClient: true })
    .then(({ name }) => console.log(`successfully connected to DB: ${name}`))
    .then(startListenServer)
    .catch(console.error);

// Allow cross origin
app.use(cors());

// Logger
// app.use(morgan('dev'));

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

let { get_ip: getIp } = require('ipware')();
app.get('/maps', (req, res) => {
    let { cookies } = req;
    let sessionID = cookies && cookies.sessionID;

    // is not authorized
    if (!sessionID) {
        return res.redirect('./auth/google');
    }

    let { clientIp: receivedIP } = getIp(req);
    let { IP: storedIP } = cache.get(sessionID) || {};
    if (storedIP === receivedIP) {
        return res.send('worked');
    }

    return res.redirect('./auth/google');
});
