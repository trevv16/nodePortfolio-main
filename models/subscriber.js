var mongoose = require("mongoose");

var subscriberSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    lists: [],
    signup_timestamp: { type: Date, default: Date.now },
    last_email_timestamp: Date,
    last_email: String,
    open_rate: Number
});

    
    

module.exports = mongoose.model('Subscriber', subscriberSchema, 'subscribers');