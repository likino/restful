var express = require('express');
var router = express.Router();

/* GET userlist page. */
router.get('/userlist', function(req, res, next) {
  res.render('userlist', { title: 'Userlist' });
});

module.exports = router;
