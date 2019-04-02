const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const UserRole = require(`./user-role-db`);

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    default: ``
  },
  login: {
    type: String,
    default: ``
  },
  firstName: {
    type: String,
    default: ``
  },
  lastName: {
    type: String,
    default: ``
  },
  email: {
    type: String,
    default: ``
  },
  password: {
    type: String,
    default: ``
  },
  userRole: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: `UserRole`
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model(`User`, UserSchema);
