var bcrypt = require("bcrypt");
var runs = require("../config").saltRuns;

module.exports.hash = function(pwdStr) {
  return bcrypt.hashSync(pwdStr, runs);
};

module.exports.verify = function(pwdToCheck, pwdHash) {
  return bcrypt.compareSync(pwdToCheck, pwdHash);
};
