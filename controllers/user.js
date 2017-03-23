var User = require('../models/user');
var Review = require('../models/review');

// get users
exports.getUsers = function(req, res, next) {
    console.log(req.query)
    console.log(req.body)
    User.find(req.query, function(err, docs) {
        if (err || docs.length == 0) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
        res.json({"status": "1", "users": docs});
    }).sort('username');
};

// get user
exports.getUser = function(req, res, next) {
    if (req.query.id) {
        User.findById(req.query.id, function(err, doc) {
            if (err || doc === null) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json(doc);
        });
        return;
    } else if (req.query.username) {
        User.findOne(req.query, function(err, doc) {
            if (err || doc === null) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json(doc);
        });
    } else {
        res.status(404).end();
    }
};

// create user
exports.createUser = function(req, res, next) {
    var user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        sex: req.body.sex,
        age: req.body.age
    });
    
    user.save(function(err) {
        if (err) {
            console.log({"status": "0", "msg": err});
            res.status(403).end();
            return;
        }
        res.json({"status": "1", "msg": "Success!"});
    });
};

// delete user and their reviews
exports.deleteUser = function(req, res, next) {
    User.findById(req.body.id, function(err, doc) {
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
        });
    });

    Review.find({userid: req.body.id}, function(err, docs) {
        if (err || docs.length == 0) {
            console.log({"status": "0", "msg": err});
            res.status(404).end();
            return;
        }

        docs.map(function(x) {
            return x.remove(function(err) {
                if (err) {
                    console.log({"status": "0", "msg": err});
                    res.status(404).end();
                    return;
                }
            })
        });
    });

    res.status(200).end();
};

// update user
exports.updateUser = function(req, res, next) {
    User.findById(req.body.id, function(err, doc) {
        if (err || doc === null) {
            console.log({"status": "0", "msg": err});
            res.status(404).end();
            return;
        }

        req.body.username ? doc.username = req.body.username : '';
        req.body.firstname ? doc.firstname = req.body.firstname : '';
        req.body.lastname ? doc.lastname = req.body.lastname : '';
        req.body.sex ? doc.sex = req.body.sex : '';
        req.body.age ? doc.age = req.body.age : '';

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