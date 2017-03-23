var mongoose = require('mongoose');

// create user schema
var UserSchema = new mongoose.Schema({
    username: {type: String, required:true, unique:true},
    firstname: {type: String, default:""},
    lastname: {type: String, default:""},
    sex: {type: String, default:""},
    age: {type: Number, default: 0}
});

var User = mongoose.model('User', UserSchema, "user");

module.exports = User;