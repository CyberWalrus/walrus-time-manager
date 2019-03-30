const mongoose = require('mongoose');
const CaseListSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
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
module.exports = mongoose.model('CaseList', CaseListSchema);