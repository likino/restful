var express = require('express');
var router = express.Router();

/* GET reviewlist page. */
router.get('/reviewlist', function(req, res, next) {
  res.render('reviewlist', { title: 'Reviewlist' });
});

module.exports = router;
