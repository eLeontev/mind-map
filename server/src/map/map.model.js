const mongoose = require('mongoose');

// define the schema for our map
const mapSchema = mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  isShared: {
    type: Boolean
  }
}, {
  timestamps: true
});

mapSchema.statics = {
  search(params) {
    //count documents https://stackoverflow.com/questions/43925662/mongoose-pagination-from-server-side

    return this.count({})
      .then((count) => {
        if (count === 0) {
          return Promise.reject({msg: 'No Document in Database..'});
        }
        return Promise.resolve(count);
      })
      .then((count) => {
        //get paginated documents
        return this.find().skip(params.pagination.start).limit(params.pagination.number).exec().then(function (docs) {
          if (!docs) {
            return Promise.reject({msg: 'No Document in Database..'});
          } else {
            return Promise.resolve({
              totalRecords: count,
              numberOfPages: Math.ceil(count / params.pagination.number),
              data: docs
            });
          }
        });
      })
      .catch((err) => Promise.reject(err));
  }
};

// create the model for badgeCategory and expose it to our app
module.exports = mongoose.model('Map', mapSchema);
