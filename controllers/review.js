var Review = require('../models/review');
var User = require('../models/user');
var Store = require('../models/store');

// get reviews
exports.getReviews = function(req, res, next) {
    Review.find(req.query, function(err, docs) {
        if (err || docs.length == 0) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
        res.json({"status": "1", "reviews": docs});
    }).sort('userID');
};

// get review
exports.getReview = function(req, res, next) {
    if (req.query.id) {
        Review.findById(req.query.id, function(err, doc) {
            if (err || doc === null) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json(doc);
        });
        return;
    } else if (req.query.storeID || req.query.userID) {
        Review.find(req.query, function(err, docs) {
            res.json({"status": "1", "reviews": docs});
        });
    } else {
        res.status(404).end();
    }  
};

// create review
exports.createReview = function(req, res, next) {
    var review = new Review({
        userID: req.body.userID,
        storeID: req.body.storeID,
        rating: req.body.rating,
        comment: req.body.comment
    });

    var haveUser = User.findById(req.body.userID, function(err, doc) {
        if (err || doc === null) {
            console.log({"status": "0", "msg": err});
            res.status(403).end();
            return;
        }
        return true;
    });

    var haveStore = Store.findById(req.body.storeID, function(err, doc) {
        if (err || doc === null) {
            console.log({"status": "0", "msg": err});
            res.status(403).end();
            return;
        }
        return true;
    });
    
    if (haveUser && haveStore) {
        review.save(function(err) {
            if (err) {
                console.log({"status": "0", "msg": err});
                res.status(403).end();
                return;
            }
            res.json({"status": "1", "msg": "Success!"});
        });
    }
};

// delete review
exports.deleteReview = function(req, res, next) {
    Review.findById(req.body.id, function(err, doc) {
        if (err || doc === null) {
            console.log({"status": "0", "msg": err});
            res.status(404).end();
            return;
        }

        doc.remove(function(err) {
            if (err) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json({"status": "1", "msg": "Success!"});
        });
    });
};

// update review
exports.updateReview = function(req, res, next) {
    Review.findById(req.body.id, function(err, doc) {
        if(err) {
            console.log({"status": "0", "msg": err});
            res.status(404).end();
            return;
        }
        req.body.userID ? doc.userID = req.body.userID : '';
        req.body.storeID ? doc.storeID = req.body.storeID : '';
        req.body.rating ? doc.rating = req.body.rating : '';
        req.body.comment ? doc.comment = req.body.comment : '';
        
        doc.save(function(err) {
            if (err) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json({"status": "1", "msg": "Success!"});
        });
    });
};