module.exports = function (req, res, next) {
  console.log(`req.session: ${JSON.stringify(req.session)}`);
  console.log(`req.user: ${JSON.stringify(req.user)}`);
  next();
};
