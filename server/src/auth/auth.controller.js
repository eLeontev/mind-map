let { get_ip: getIp } = require('ipware')();
let uuid = require('uuid/v1');

let maxAge = 24 * 60 * 60 * 1000; // one day in ms

let cache = require('../cache');
let User = require('../schemas/user.schema');

let createOrUpdateUser = (user, id, userData) => {
    if (user) {
        return User.where({ id }).update(userData);
    }

    return new User(userData).save();
};

let generateSessionID = () => uuid();

let saveCookieForUser = (res, sessionID) => {
    res.cookie('sessionID', sessionID, {
        maxAge,
    });

    return sessionID;
};

let setCacheForUser = (userDataWithIP, sessionID) => (
    cache.set(sessionID, userDataWithIP)
);

let authController = {
    loginMiddleware: (req, res, next) => {
        let { user: { id, displayName } } = req;
        let userData = { id, displayName };

        let IP = getIp(req).clientIp;

        User.findOne({ id })
            .then((user) => createOrUpdateUser(user, id, userData))
            .then(generateSessionID)
            .then((sessionID) => saveCookieForUser(res, sessionID))
            .then((sessionID) => setCacheForUser({ ...userData, IP }, sessionID))
            .then(() => next());
    },
    successLoginCallback: (res) => res.redirect('/'),
    checkUserMiddleware: (req, res, next) => {
        let { cookies } = req;
        let sessionID = cookies && cookies.sessionID;

        let { clientIp: receivedIP } = getIp(req);
        let { IP: storedIP, id, displayName } = cache.get(sessionID || '') || {};

        // is not authorized or expired / hacked
        if (!sessionID || storedIP !== receivedIP) {
            return res.status(401).send('The session has been expired');
        }

        req.userData = { id, displayName };
        return next();
    },
};

module.exports = authController;
