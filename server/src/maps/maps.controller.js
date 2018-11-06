let uuid = require('uuid/v1');
let Map = require('../schemas/map.schema');

let generateError = (status, message) => {
    throw new Error(`Status: ${status} - ${message}`);
};

let sendStatusWithMessage = (message, res) => (
    res.status(400).send(message)
);

let mapsController = {
    getMapsByOwner: ({ userData: { id = 'testID' } }, res) => {
        Map.find({ ownerID: id })
            .then((maps = []) => (
                res.send(maps.map(({ id, label, updatedAt: lastUpdated }) => ({
                    id,
                    label,
                    lastUpdated,
                }))))
            );
    },
    createMap: ({ userData: { id: ownerID = 'testID' }, body: { label, blocks } }, res) => {
        Map.findOne({ label, ownerID })
            .then((map) => {
                if (map) {
                    generateError(400, 'map Label should be uniq');
                }
            })
            .then(() => new Map({
                id: uuid(),
                label,
                ownerID,
                blocks,
            }).save()
                .then((map) => res.send(map))
            )
            .catch(({ ValidatorError }) => sendStatusWithMessage(ValidatorError, res));
    },
    saveAndUpdateMap: ({ params: { id }, body: { mapData } }, res) => {
        Map.findOne({ id })
            .then((map) => {
                if (!map) {
                    generateError(400, 'the map is not created yet');
                }

                return map;
            })
            .then((map) => Map.where({ id: map.id })
                .update({
                    ...map.toString(),
                    ...mapData
                })
                .then(res.send({ status: 'updated' }))
            )
            .catch((error) => sendStatusWithMessage(error, res));
    },
    getMapByID: ({ params: id }, res) => {
        Map.findOne(id)
            .then((map) => {
                if (!map) {
                    generateError(400, 'not found');
                }
                return map;
            })
            .then((map) => res.send(map))
            .catch((error) => sendStatusWithMessage(error, res));
    }
};

module.exports = mapsController;
