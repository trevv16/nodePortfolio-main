var express = require('express');
var router = express.Router();
var userCon = require("../controllers/userCon.js");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// Passport --Auth
var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var User = require("../models/user.js");

var pass = require('../config/passport.js');
// pass(passport);

// var app = express();


// app.use(flash());
// app.use(express.static("public"));
// app.use(session({
//    secret: process.env.SESSION_SECRET,
//    resave: false,
//    saveUninitialized: false
//   }));
// app.use(passport.initialize());
// app.use(passport.session());


// passport.use(new LocalStrategy({
//   usernameField: 'queryemail',
//   passwordField: 'querypassword'
// },
// function(queryemail, querypassword, done) {
//   User.findOne({email: queryemail}).then( function(user) {
//     // Check if Exists
//     if(user){
//       // Check password
//       bcrypt.compare(querypassword, user.password).then(function(check) {
//         if(!check) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         if(check) {
//           return done(null, user);
//         }
//       });
//     }
//     else {
//       console.log("User Does Not Exist.");
//       return done(null, false, { message: 'User does not exist.' });
//     }
//   })
//   .catch( function(err) {
//     if (err) { return done(err); }
//   }); 
// }),
// passport.serializeUser((user, done) => done(null, user._id)),
// passport.deserializeUser((id, done) => {
//   User.findOne({_id: id}).then( function(user) { 
//     done(null, user._id)
//   })
//   .catch( function(err) {
//     if (err) { return done(err); }
//   }) 
// })

// );


// function checkAuth(req, res, next) {
//   if(req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/users/signin');
// }

// function checkNOTAuth(req, res, next) {
//   if(req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   next()
// }



// /* GET user sign up listing. */
// router.get('/signup', pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/signup', {Title: "Sign Up"});
// });

// /* POST user sign up listing. */
// router.post('/logup', userCon.signUp);



// /* GET user sign in listing. */
// router.get('/signin', pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/signin', {Title: "Sign In"});
// });

// /* POST user sign in listing. */
// router.post('/login', pass.checkNOTAuth, passport.authenticate('local', 
// { successRedirect: '/admin/newProject',
//   failureRedirect: 'signin',
//   failureFlash: true 
// }));



// /* GET user sign out listing. */
// router.get('/signout', function(req, res, next) {
//   res.render('user/signout', {Title: "Sign Out"});
// });



// /* GET user forgot password listing. */
// router.get('/forgot',pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/forgot', {Title: "Forgot Password"});
// });

// /* POST user forgot password listing. */
// router.post('/resetpassword',pass.checkNOTAuth, userCon.resetpassword);


// /* GET change forgot password listing. */
// router.get('/updatePassword/:userID',pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/changePw', {Title: "Change Password"});
// });

// /* GET change forgot password listing. */
// router.post('/updatePassword/:userID',pass.checkNOTAuth, userCon.changepassword);



// module.exports = router;
