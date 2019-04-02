const mongoose = require(`mongoose`);
const UserSessionSchema = new mongoose.Schema({
  "userId": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": `User`
  },
  "userLogin": {
    "type": String,
    "default": ``
  },
  "userRole": [
    {
      "type": mongoose.Schema.Types.ObjectId,
      "ref": `UserRole`
    }
  ],
  "timestamp": {
    "type": Date,
    "default": Date.now()
  },
  "isActive": {
    "type": Boolean,
    "default": true
  }
});
module.exports = mongoose.model(`UserSession`, UserSessionSchema);
