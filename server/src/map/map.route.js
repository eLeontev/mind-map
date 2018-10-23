/**
 * Created by KD
 */
const express = require('express');
const router = express.Router();
const mapController = require('./map.controller');

router.route('/')
  .get(mapController.get)
  .post(mapController.add);

router.route('/:id')
  .put(mapController.update)
  .delete(mapController.remove);

module.exports = router;
