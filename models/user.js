var mongoose = require("mongoose");
var userUrl = require("../utils/userUrl");
var pwd = require("../private/pwd");

var userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phone: String,
  relationships: [ mongoose.Schema.Types.ObjectId ],
  passwordHash: String,
});

userSchema.virtual("fullName").
  get(function() { return this.firstName + " " + this.lastName; }).
  set(function(fullName) { 
    let names = fullName.split(" ");
    this.firstName = names[0];
    this.lastName = names[1] || null;
  });

userSchema.virtual("url").
  get(function() { return userUrl(this); });

userSchema.method('verifyPassword', password => pwd.verify(password, this.passwordHash));

module.exports = mongoose.model("User", userSchema);
