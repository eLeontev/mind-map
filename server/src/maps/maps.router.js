let express = require('express');

let router = express.Router();

let { checkUserMiddleware } = require('../auth/auth.controller');
let { getMapsByOwner, createMap, saveAndUpdateMap } = require('./maps.controller');

router.use(checkUserMiddleware)
    .get('/', getMapsByOwner)
    .post('/create', createMap)
    .put('/save', saveAndUpdateMap);

module.exports = router;
