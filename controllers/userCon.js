var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const fs   = require('fs');
const jwt  = require('jsonwebtoken');

var User = require("../models/user.js");


module.exports = { 
  // Sign Up Function
  signUp: (req, res, next) => { 
    var queryname = req.body.name;
    var queryemail = req.body.email;
    var querypassword = req.body.password;
    var salt;
    var hashPassword;
    
    User.find({email: queryemail}).then( function(err, result) {
      // Validation
      
      
      // Check if Exists
      if(result){
        console.log(result[0].email, " Already Exists.");
        res.redirect('signin');
      }
    });
    
    // Hash Password
    async function hashing() {
      salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(querypassword, salt);
    }
    
    hashing().then( function() {
      var genUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: queryname,
        email: queryemail,
        password: hashPassword
      });
      
      genUser.save().then( function(result) {
        console.log('sign up successful');
        res.redirect('signIn');
      })
      .catch( function(err) {
        if(err){
          console.log('DB Error:' + err);
        }
      });
    });
  },
  // Sign In Function
  signIn: (req, res, next) => { 
    var queryemail = req.body.email;
    var querypassword = req.body.password;
    var user;
    
    User.findOne({email: queryemail}).then( function(result) {
      // Check if Exists
      if(result){
        user = result;
        querypassword = req.body.password;
      
        // Check password
        bcrypt.compare(querypassword, user.password).then(function(check) {   
          if(!check) {
            console.log("Incorrect Password");
            res.redirect('signIn')
          }
          if(check) {
            var token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY);
            console.log("Login Successful!");
            console.log("Token: ", token);
          }
        });
      }
      else {
        //console.log("User Does Not Exist.");
        res.redirect('/');
      }
    })
    .catch( function(err) {
        if(err){
          console.log('DB Error:' + err);
        }
    }); 
  },
    
  resetPassword: (req, res, next) => {
     // Check if User Exists
    
    
    // If User
    
    
    
    // Send Reset Password Link to Email

  },

  changePassword: (req, res, next) => {
    // Validation
    
    
    
    // Find User
    
    
    // If User
    
    
    // Hash Password
    
    
    // Update User Password Field
    
  }
}
