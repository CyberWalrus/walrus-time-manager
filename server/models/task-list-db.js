const mongoose = require('mongoose');
const TaskListSchema = new mongoose.Schema({
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
module.exports = mongoose.model('TaskList', TaskListSchema);
