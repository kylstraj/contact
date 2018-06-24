var User = require("../models/user");

module.exports = function(user) {
  return "/user?id=" + user._id;
}

