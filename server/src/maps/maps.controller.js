let uuid = require('uuid/v1');
let Map = require('../schemas/map.schema');

let generateError = (status, message) => {
    throw new Error({
        status,
        message
    })      
};

let sendStatusWithMessage = ({ message, status = 400 }, res) => (
    res.status(status).send(message)
);

let mapsController = {
    getMapsByOwner: ({ userData: {id, displayName } }, res) => {
        Map.find({ ownerID: id })
            .then((maps) => res.send({
                displayName,
                maps: maps || [],
            }));
    }, 
    createMap: ({ userData: { id: ownerID }, body: { label, blocks } }, res) => {
        ownerID = 'ownerID'
        Map.findOne({ label, ownerID })
            .then((map) => {
                if (map) {
                    generateError(400, 'the payload is not verified')
                }
            })
            .then(() => new Map({
                    id: uuid(),
                    label,
                    ownerID,
                    blocks,
                }).save()
                    .then((data) => res.send(data))
            )
            .catch((error) => sendStatusWithMessage(error, res));
    },
    saveAndUpdateMap: ({ userData: { id: ownerID }, body: { label, mapData } }, res) => {
        ownerID = 'ownerID'
        Map.findOne({ ownerID, label })
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
                .then(res.send('updated'))
            )
            .catch((error) => sendStatusWithMessage(error, res));
    }
}

module.exports = mapsController;
