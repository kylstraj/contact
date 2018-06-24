var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const payload = { Hello: 'World' };
  console.log("************************** Payload ***************************");
  console.log(payload);
  console.log("**************************************************************");
  res.json(payload);
});

module.exports = router;
