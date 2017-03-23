var express = require('express');
var router = express.Router();
var reviewController = require('../controllers/review.js');

router.get('/reviews', reviewController.getReviews);

router.get('/review', reviewController.getReview);

router.post('/review', reviewController.createReview);

router.delete('/review', reviewController.deleteReview);

router.put('/review', reviewController.updateReview);

module.exports = router;