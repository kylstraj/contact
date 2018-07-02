var bcrypt = require("bcrypt");
var runs = require("../config").saltRuns;

module.exports.hash = function(pwdStr) {
  pwdStr = pwdStr || '';
  return bcrypt.hashSync(pwdStr, runs);
};

module.exports.verify = function(pwdToCheck, pwdHash) {
  pwdToCheck = pwdToCheck || '';
  pwdHash = pwdHash || '';
  return bcrypt.compareSync(pwdToCheck, pwdHash);
};
