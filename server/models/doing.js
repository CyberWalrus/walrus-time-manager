const mongoose = require('mongoose');
const DoingSchema = new mongoose.Schema({
  value: {
    type: String,
    default: ''
  }, 
  key: {
    type: String,
    default: 'doing'
  },
  createdUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model('Doing', DoingSchema);