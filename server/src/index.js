require('dotenv').config();

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');

const app = express();
const server = require('http').Server(app);

let { env } = process;
let { DB_URL = env.DB_URL } = require('../keys');

let PORT = env.PORT;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

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
