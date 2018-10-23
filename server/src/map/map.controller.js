const httpStatus = require('http-status');
const map = require('./map.helper');

function get(req, res) {
  map.getAllMaps()
    .then(maps => {
      return res.send(maps);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
};

function add(req, res) {
  map.addMap(req.body)
    .then(map => {
      return res.send(map);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
};

function update(req, res) {
  map.updateMap(req.body, req.params.id)
    .then(map => {
      return res.send(map);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
};

function remove(req, res) {
  map.removeMap(req.params.id)
    .then(map => {
      return res.send(map);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
};

module.exports = {
  get,
  add,
  update,
  remove,
};
