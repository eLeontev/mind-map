const map = require('./map.model');

/**
 * Get all active maps
 * @return {maps} - return all maps
 * @return {err} - return error
 */
let getAllMaps = () => {
  return map
    .find({})
    .sort({label: 1})
    .exec()
    .then((maps) => Promise.resolve(maps))
    .catch((err) => Promise.reject(err));
};

/**
 * Get map by Id
 * @param {ObjectId} id - map id
 * @return {map} - return map
 * @return {err} - return error
 */
let getMapById = (id) => {
  return map
    .findById(id)
    .exec()
    .then((map) => Promise.resolve(map))
    .catch((err) => Promise.reject(err));
};

/**
 * Get map by label
 * @param {String} label - map label
 * @return {maps} - return map
 * @return {err} - return error
 */
let getMapByLabel = (label) => {
  return map
    .findOne({
      label: new RegExp('^' + label + '$', "i")
    })
    .exec()
    .then((map) => Promise.resolve(map))
    .catch((err) => Promise.reject(err));
};

/**
 * Add map
 * @param {object} req - Request json object
 * @return {map} - return map
 * @return {err} - return error
 */
let addMap = (req) => {
  let oMap = new map();
  oMap.label = req.label;
  oMap.owner = req.owner;
  oMap.isShared = req.isShared || false;

  return oMap.save()
    .then(map => Promise.resolve(map))
    .catch(err => Promise.reject(err));
};

/**
 * Update map
 * @param {object} req - Request json object
 * @return {map} - return map
 * @return {err} - return error
 */
let updateMap = (req, id) => {
  return map
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
        .then(updatedMap => Promise.resolve(updatedMap))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

/**
 * Remove map by Id
 * @param {ObjectId} id - map id
 * @return {map} - return map
 * @return {err} - return error
 */
let removeMap = (id) => {
  return map
    .findById(id)
    .exec()
    .then((oMap) => {
      return oMap
        .remove()
        .then((rMap) => Promise.resolve(rMap))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

module.exports = {
  getAllMaps,
  getMapById,
  getMapByLabel,
  addMap,
  updateMap,
  removeMap
};
