let express = require('express');

let router = express.Router();

let maps = require('./maps');
let auth = require('./auth');

router.use('/rest/v1/maps', maps);
router.use('/auth', auth);

module.exports = router;
