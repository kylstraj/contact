var User = require('../models/user');
var pwd = require('../private/pwd');

module.exports = function(req, res, next) {
  const { user } = req;
  if (!user) return res.json({error: 'No user is logged in'});
  return next();
};
