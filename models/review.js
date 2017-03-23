var mongoose = require('mongoose');

// create review schema
var ReviewSchema = new mongoose.Schema({
    userID: {type: String, required:true},
    storeID: {type: String, required:true},
    rating: {type:Number, required:true},
    comment: {type: String}
});

var Review = mongoose.model('Review', ReviewSchema, "review");

module.exports = Review;