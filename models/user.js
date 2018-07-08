var mongoose = require("mongoose");
var userUrl = require("../utils/userUrl");
var pwd = require("../private/pwd");

var userSchema = mongoose.Schema({
  username: {
    maxlength: 20,
    required: true,
    type: String,
    unique: true,
  },
  fullName: {
    maxlength: 255,
    required: true,
    type: String,
  },
  email: {
    maxlength: 255,
    type: String,
  },
  address: {
    maxlength: 255,
    type: String,
  },
  phone: {
    maxlength: 255,
    type: String,
  },
  contacts: [ mongoose.Schema.Types.ObjectId ],
  passwordHash: {
    required: true,
    type: String,
  },
});

userSchema.method('verifyPassword', password => pwd.verify(password, this.passwordHash));

module.exports = mongoose.model("User", userSchema);
