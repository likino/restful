var express = require('express');
var router = express.Router();

/* GET storelist page. */
router.get('/storelist', function(req, res, next) {
  res.render('storelist', { title: 'Storelist' });
});

module.exports = router;
