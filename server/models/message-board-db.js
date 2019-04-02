const mongoose = require(`mongoose`);
const MessageBoardSchema = new mongoose.Schema({
  "value": {
    "type": String,
    "default": ``
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
module.exports = mongoose.model(`MessageBoard`, MessageBoardSchema);
