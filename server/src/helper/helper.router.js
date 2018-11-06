let express = require('express');
let {
    isUserAuthorized,
    clearCache,
    clearCookie,
} = require('./helper.controller');

let router = express.Router();

router.route('/isUserAuthorized')
    .get((req, res) => isUserAuthorized(req)
        .then((displayName) => res.send(displayName))
        .catch(() => res.status(401).send('is not authorized'))
    );

router.route('/signOff')
    .post((req, res) => clearCache(req)
        .then(() => clearCookie(res))
        .then(() => res.send({ status: 'cleared' }))
        .catch((error) => res.status(404).send(error))
    );

module.exports = router;
