const express = require('express');
const router = express.Router();
const map = require('./map/map.route');
/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
  message: 'Cool'
}));

router.use('/v1/maps', map);

module.exports = router;
