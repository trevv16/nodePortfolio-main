var mongoose = require("mongoose");
const jwt  = require('jsonwebtoken');

var postSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String
});



module.exports = mongoose.model('Post', postSchema, 'posts');