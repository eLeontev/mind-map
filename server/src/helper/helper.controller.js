let { get_ip: getIp } = require('ipware')();

let cache = require('../cache');

let helperController = {
    isUserAuthorized: (req) => new Promise((res, rej) => {
        let { cookies = {} } = req;
        let IP = getIp(req).clientIp;

        let { sessionID = '' } = cookies;
        let { IP: cachedIP, displayName } = cache.get(sessionID);
        if (cachedIP === IP) {
            return res({ displayName });
        }
        return rej();
    }),
};

module.exports = helperController;
