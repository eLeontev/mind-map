const express = require('express');
const router = express.Router();
let passport = require('passport');
require('./pasport.setup');

router
    .use(passport.initialize())
    .use(passport.session())
    .use(passport.authenticate('google', {
        scope: ['profile']
    }))
    .route('/google')
    .post((req, res) => {
        res.send('123')
    })

router.route('/google/callback')
    .get((req, res) => res.send('worked'))


module.exports = router;
