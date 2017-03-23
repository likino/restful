var Store = require('../models/store');
var Review = require('../models/review');

// get stores
exports.getStores = function(req, res, next) {
    Store.find(req.query, function(err, docs) {
        if (err || docs.length == 0) {
            console.log({"status": "0", "msg": err});
            res.status(404).end();
            return;
        }
        res.json({"status": "1", "stores": docs});
    }).sort('storename');
};

// get store
exports.getStore = function(req, res, next) {
    if (req.query.id) {
        Store.findById(req.query.id, function(err, doc) {
            if (err || doc === null) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json(doc);
        });
        return;
    } else if (req.query.storename) {
        Store.find(req.query, function(err, docs) {
            if (err || docs.length == 0) {
                console.log({"status": "0", "msg": err});
                res.status(404).end();
                return;
            }
            res.json({"status": "1", "stores": docs});
        });
    } else {
        res.status(404).end();
    }

    
};

// create store
exports.createStore = function(req, res, next) {
    var store = new Store({
        storename: req.body.storename,
        category: req.body.category,
        address: req.body.address
    });
    
    store.save(function(err) {
        if (err) {
            console.log({"status": "0", "msg": err});
            res.status(403).end();
            return;
        }
        res.json({"status": "1", "msg": "Success!"});
    });
};

// delete store and their reviews
exports.deleteStore = function(req, res, next) {
    Store.findById(req.body.id, function(err, doc) {
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

    Review.find({storeid: req.body.id}, function(err, docs) {
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

// update store
exports.updateStore = function(req, res, next) {
    Store.findById(req.body.id, function(err, doc) {
        if (err || doc === null) {
            console.log({"status": "0", "msg": err});
            res.status(404).end();
            return;
        }
        
        req.body.storename ? doc.storename = req.body.storename : '';
        req.body.category ? doc.category = req.body.category : '';
        req.body.address ? doc.address = req.body.address : '';

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
