var mongoose = require("mongoose");
const jwt  = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    active: Boolean
});



module.exports = mongoose.model('User', userSchema, 'users');