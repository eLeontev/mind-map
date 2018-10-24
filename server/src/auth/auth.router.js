const express = require('express');
const router = express.Router();
let passport = require('passport');
require('./pasport.setup');

router
    .use(passport.initialize())
    .use(passport.authenticate('google', {
        scope: ['profile'],
        session: false,
    }))
    .route('/google')
    .post((req, res) => {
        res.send('123')
    });

let bdMap = new Map();
router.route('/google/callback')
    .get((req, res) => {
        let { user: { id, displayName } } = req;
        
        
        if (bdMap.get(id)) {
            res.clearCookie('userData');
        }

        bdMap.set(id, 'maps');
        res.cookie(`userData`, id, {maxAge: 24 * 60 * 60 * 1000});

        res.redirect('/page');
    });

module.exports = router;
