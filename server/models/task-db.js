const mongoose = require(`mongoose`);
const TaskSchema = new mongoose.Schema({
  tasklistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `TaskList`
  },
  dayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Day`
  },
  created: {
    type: Number,
    default: new Date().getTime()
  },
  isActive: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model(`Task`, TaskSchema);
