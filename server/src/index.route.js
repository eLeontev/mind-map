const express = require('express');
const router = express.Router();
const map = require('./map/map.route');
let auth = require('./auth/auth.router');

router.use('/v1/maps', map);
router.use('/auth', auth);

module.exports = router;
