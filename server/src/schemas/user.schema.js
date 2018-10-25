const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  lastIPvisit: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
