require('./pasport.setup');

let express = require('express');
let passport = require('passport');
let { get_ip: getIp } = require('ipware')();
let store = require('../store');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.authenticate(
    'google', {
    scope: ['profile'],
    session: false,
}));

router.route('/google')
    .post((req, res) => res.send('Google authorizing'));

router.use((req, res, next) => {
        console.log('TODO move to middleware');
        next();
    })
    .route('/google/callback')
    .get((req, res) => {
        let { user: { id, displayName } } = req;
        let IP = getIp(req).clientIp;

        if (store.getUser(id)) {
            res.clearCookie('id');
        }

        store.setUser(id, { displayName, IP });
        res.cookie('id', id, {
            maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect('/page');
    });

module.exports = router;
