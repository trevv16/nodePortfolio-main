// Passport --Auth
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({email: username}).then( function(user) {
      // Check if Exists
      if(user){
        // Check password
        console.log('User: ', user);
        bcrypt.compare(password, user.password).then(function(check) {
          if(!check) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          if(check) {
            passport.serializeUser((user, done) => done(null, user._id))
            return done(null, user);
          }
        });
      }
      else {
        console.log("User Does Not Exist.");
        return done(null, false, { message: 'User does not exist.' });
      }
    })
    .catch( function(err) {
      if (err) { return done(err); }
    }); 
  }),
  passport.serializeUser((user, done) => done(null, user._id)),
  passport.deserializeUser((id, done) => {
    User.findOne({_id: id}).then( function(user) { 
      done(null, user._id)
    })
    .catch( function(err) {
      if (err) { return done(err); }
    }) 
  })
  
);

exports.checkAuth = function(req, res, next) {
    if(req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/signin');
  }
  
  exports.checkNOTAuth = function(req, res, next) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }
    next()
  }
