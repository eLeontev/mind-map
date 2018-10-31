let express = require('express');

let router = express.Router();

let maps = require('./maps');
let auth = require('./auth');

router.use('/rest/v1/maps', maps);
router.use('/auth', auth);

router
    .get('/isUserAutorized', ({ userData }, res) => res.send({ displayName: '123' }))
        // .then((userData) => console.log(userData) || userData)
        // .then((userData) => res.send(userData))
        // .catch(console.error)
    // );

    router.get('*', (req, res) => res.redirect('/'));

module.exports = router;
