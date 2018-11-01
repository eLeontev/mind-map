let express = require('express');

let router = express.Router();

let maps = require('./maps');
let auth = require('./auth');
let helper = require('./helper');

router.use('/rest/v1/maps', maps);
router.use('/auth', auth);
router.use('/helper', helper);

router.get('*', (req, res) => res.redirect('/'));

module.exports = router;
