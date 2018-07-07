var mongoose = require("mongoose");
var userUrl = require("../utils/userUrl");
var pwd = require("../private/pwd");

var userSchema = mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  address: String,
  phone: String,
  contacts: [ mongoose.Schema.Types.ObjectId ],
  relationships: [ mongoose.Schema.Types.ObjectId ],
  passwordHash: String,
});

userSchema.virtual("url").
  get(function() { return userUrl(this); });

userSchema.method('verifyPassword', password => pwd.verify(password, this.passwordHash));

module.exports = mongoose.model("User", userSchema);
