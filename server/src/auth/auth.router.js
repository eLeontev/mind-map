require('./pasport.setup');

let express = require('express');
let passport = require('passport');

let { middleware, successLoginCallback } = require('./auth.controller');

let router = express.Router();

router.use(passport.initialize());
router.use(passport.authenticate(
    'google',
    {
        scope: ['profile'],
        session: false,
    },
));

router.route('/google')
    .post((req, res) => res.send('Google authorizing'));

router.use(middleware);
router.route('/google/callback')
    .get(successLoginCallback);

module.exports = router;
