let mapsController = {
    getMapsByOwner: ({ userData: {id, displayName } }, res) => {
        return res.send({
            displayName,
            maps: [],
        })
    }
}

module.exports = mapsController;