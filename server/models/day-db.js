const mongoose = require(`mongoose`);
const DaySchema = new mongoose.Schema({
  "date": {
    "type": Number
  },
  "times": [
    {
      "timeStart": {
        "type": Number,
        "default": 0
      },
      "timeEnd": {
        "type": Number,
        "default": 0
      },
      "taskId": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": `User`,
        "default": null
      }

    }
  ],
  "timeStart": {
    "type": Number,
    "default": 0
  },
  "userId": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": `User`
  },
  "created": {
    "type": Number,
    "default": new Date().getTime()
  },
  "isActive": {
    "type": Boolean,
    "default": true
  }
});
module.exports = mongoose.model(`Day`, DaySchema);
