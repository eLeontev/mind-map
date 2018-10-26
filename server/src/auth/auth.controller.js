let { get_ip: getIp } = require('ipware')();
let uuid = require('uuid/v1');
let maxAge = 24 * 60 * 60 * 1000; // one day in ms

let cache = require('../cache');
let User = require('../schemas/user.schema');

let authController = {
    middleware(req, res, next) {
        let { user: { id, displayName } } = req;
        let userData = { id, displayName };

        let IP = getIp(req).clientIp;

        User.findOne({ id }).then((user) => {
            if (user) {
                return User.where({ id }).update(userData);
            }

            return new User(userData).save();
        }).then(() => {
            let sessionID = uuid();
            cache.set(sessionID, {id, IP, displayName});

            res.cookie('sessionID', sessionID, {
                maxAge,
            });
        }).then(next)
            .catch(console.error);
    },
    successLoginCallback(req, res) {
        res.redirect('/maps');
    },
};

module.exports = authController;
