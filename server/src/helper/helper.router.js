let express = require('express');
let { isUserAuthorized } = require('./helper.controller');

let router = express.Router();

router.route('/isUserAuthorized')
    .get((req, res) => isUserAuthorized(req)
        .then((displayName) => res.send(displayName))
        .catch(() => res.status(401).send('is not authorized'))
    );

module.exports = router;
