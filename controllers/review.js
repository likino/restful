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
    }).sort('userid');
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
    } else if (req.query.storeid || req.query.userid) {
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
        userid: req.body.userid,
        storeid: req.body.storeid,
        rating: req.body.rating,
        comment: req.body.comment
    });

    User.findById(req.body.userid, function(err, doc) {
        if (err || doc === null) {
            console.log({"status": "0", "msg": err});
	res.status(403).end();
            return false;
        }
        Store.findById(req.body.storeid, function(err, doc) {
            if (err || doc === null) {
            	console.log({"status": "0", "msg": err});
		res.status(403).end();
            	return false;
            }
            review.save(function(err) {
                if (err) {
                    console.log({"status": "0", "msg": err});
                    res.status(403).end();
                    return;
                }
                res.json({"status": "1", "msg": "Success!"});
            });
	});
    });
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
        req.body.userid ? doc.userid = req.body.userid : '';
        req.body.storeid ? doc.storeid = req.body.storeid : '';
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
