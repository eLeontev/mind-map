const httpStatus = require('http-status');
const map = require('./map.helper');

let connectionDBtoServerHelper = (dbSelection, res) => dbSelection
  .then(obj => res.send(obj))
  .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));

let get = (req, res) => connectionDBtoServerHelper(map.getAllMaps(), res);
let add = (req, res) => connectionDBtoServerHelper(map.addMap(req.body), res);
let update = (req, res) => connectionDBtoServerHelper(map.updateMap(req.body, req.params.id), res);
let remove = (req, res) => connectionDBtoServerHelper(map.removeMap(req.params.id), res);

module.exports = {
  get,
  add,
  update,
  remove,
};
