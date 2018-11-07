let express = require('express');

let router = express.Router();

let { checkUserMiddleware } = require('../auth/auth.controller');
let {
    getMapsByOwner,
    createMap,
    saveAndUpdateMap,
    getMapBlocksByID
} = require('./maps.controller');

router.use(checkUserMiddleware)
    .get('/', getMapsByOwner)
    .post('/', createMap)
    .get('/:id', getMapBlocksByID)
    .put('/:id', saveAndUpdateMap);

module.exports = router;
