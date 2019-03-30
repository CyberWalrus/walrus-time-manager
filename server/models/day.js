const mongoose = require('mongoose');
const DaySchema = new mongoose.Schema({
  date:{
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
module.exports = mongoose.model('Day', DaySchema);