const mongoose = require('mongoose');
const MessageListSchema = new mongoose.Schema({
  value: {
    type: String,
    default: ''
  },
  mmessageBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessageBoard'
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
module.exports = mongoose.model('MessageList', MessageListSchema);