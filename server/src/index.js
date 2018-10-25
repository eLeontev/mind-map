require('dotenv').config();

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let { DB_URL } = require('./auth/keys');
let store = require('./store');

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
app.get('/page', (req, res) => {
    let { cookies } = req;
    let id = cookies && cookies.id;

    // is not authorized
    if (!id) {
        return res.redirect('./auth/google'); 
    }
    
    let { IP: storedIP } = store.getUser(id);
    let { clientIp: receivedIP } = getIp(req);
    console.log(storedIP)
    console.log(receivedIP);
    if (storedIP === receivedIP) {
        return res.send('worked');
    }

    store.setUser(id, null);
    res.clearCookie('userData');

    return res.redirect('./auth/google');
});
