const mongoose = require(`mongoose`);
const DayTimeSchema = new mongoose.Schema({
  "dayId": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": `Day`
  },
  "time":{
    "type": Date
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
module.exports = mongoose.model(`DayTime`, DayTimeSchema);
