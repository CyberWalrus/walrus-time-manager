const mongoose = require(`mongoose`);

const MenuSchema = new mongoose.Schema({
  label: {
    type: String,
    default: ``
  },
  url: {
    type: String,
    default: ``
  },
  index: {
    type: Number,
    default: 0,
    unique: true
  },
  userRole: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `UserRole`
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model(`Menu`, MenuSchema);
