const mongoose = require('mongoose');
const UserRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model('UserRole', UserRoleSchema);
