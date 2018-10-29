const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    blocks: {
        type: [{
            id: String,             
            parentID: String,
            isEditMode: Boolean,
            hasChildren: Boolean,
            value: String,
            isRoot: Boolean
        }],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Map', mapSchema);
