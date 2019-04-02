const mongoose = require(`mongoose`);
const MessageSchema = new mongoose.Schema({
  "value": {
    "type": String,
    "default": ``
  },
  "messageList": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": `MessageList`
  },
  "createdUserId": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": `User`
  },
  "created": {
    "type": Date,
    "default": Date.now
  },
  "isActive": {
    "type": Boolean,
    "default": true
  }
});
module.exports = mongoose.model(`Message`, MessageSchema);
