var mongoose = require("mongoose");
const jwt  = require('jsonwebtoken');

var blogSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String
});



module.exports = mongoose.model('Blog', blogSchema, 'blogs');