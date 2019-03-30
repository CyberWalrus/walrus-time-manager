const mongoose = require('mongoose');
const CaseSchema = new mongoose.Schema({
  value: {
    type: String,
    default: ''
  },
  DoingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doing'
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
module.exports = mongoose.model('Case', CaseSchema);