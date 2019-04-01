const mongoose = require('mongoose');
const CaseSchema = new mongoose.Schema({
  value: {
    type: String,
    default: ''
  },
  caseListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseList'
  },
  dayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day'
  },
  timeStart: {
    type: Date
  },
  timeEnd: {
    type: Date
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