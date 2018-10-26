let NodeCache = require('node-cache');

module.exports = new NodeCache({
    stdTTL: 25 * 60 * 60, // in seconds
});
