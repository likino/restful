var mongoose = require('mongoose');

// create review schema
var ReviewSchema = new mongoose.Schema({
    userid: {type: String, required:true, ref: 'User'},
    storeid: {type: String, required:true, ref: 'Store'},
    rating: {type:Number, required:true,min:0,max:10},
    comment: {type: String}
});

var Review = mongoose.model('Review', ReviewSchema, "review");

module.exports = Review;
