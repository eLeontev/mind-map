const Map = require('./map.model');

/**
 * Get all active maps
 * @return {maps} - return all maps
 */
let getAllMaps = () => {
  return Map
    .find({})
    .sort({label: 1})
    .exec()
    .then(maps => maps);
};

/**
 * Get map by Id
 * @param {ObjectId} id - map id
 * @return {map} - return map
 */
let getMapById = (id) => {
  return Map
    .findById(id)
    .exec()
    .then(map => map);
};

/**
 * Get map by label
 * @param {String} label - map label
 * @return {maps} - return map
 */
let getMapByLabel = (label) => {
  return Map
    .findOne({
      label: new RegExp('^' + label + '$', "i")
    })
    .exec()
    .then(map => map);
};

/**
 * Add map
 * @param {object} req - Request json object
 * @return {map} - return map
 */
let addMap = (req) => {
  let oMap = new Map({
    label: req.label,
    owner: req.owner,
    isShared: req.isShared || false
  });

  return oMap.save()
    .then(map => map);
};

/**
 * Update map
 * @param {object} req - Request json object
 * @return {map} - return map
 */
let updateMap = (req, id) => {
  return Map
    .findById(id)
    .exec()
    .then((oMap) => {
      oMap.label = req.label || oMap.label;
      oMap.owner = req.owner || oMap.owner;
      if (typeof req.isShared !== 'undefined' && req.isShared !== null) {
        oMap.isShared = req.isShared
      } else {
        oMap.isShared = oMap.isShared
      }

      return oMap.save()
        .then(updatedMap => updatedMap);
    })
};

/**
 * Remove map by Id
 * @param {ObjectId} id - map id
 * @return {map} - return map
 */
let removeMap = (id) => {
  return Map
    .findById(id)
    .exec()
    .then((oMap) => {
      return oMap
        .remove()
        .then(rMap => rMap);
    });
};

module.exports = {
  getAllMaps,
  getMapById,
  getMapByLabel,
  addMap,
  updateMap,
  removeMap
};
