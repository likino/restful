var mongoose = require('mongoose');

// create store schema
var StoreSchema = new mongoose.Schema({
    storename: {type: String, required:true,unique:false},
    category: {type: String, default:""},
    address: {type: String, default:""}
});

var Store = mongoose.model('Store', StoreSchema, "store");

module.exports = Store;
