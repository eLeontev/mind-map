let express = require('express');

let router = express.Router();

let { checkUserMiddleware } = require('../auth/auth.controller');
let { getMapsByOwner } = require('./maps.controller');

router.use(checkUserMiddleware)
    .get('/', getMapsByOwner);

module.exports = router;
