var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const today = new Date().toJSON().slice(0,10);
  const tomorrow = new Date(+new Date() + 86400000).toJSON().slice(0,10);
  res.render('index', { today, tomorrow });
});

module.exports = router;
