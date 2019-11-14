var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var User = require("../models/user.js");

var userCon = require("../controllers/userCon.js");


/* GET user sign up listing. */
router.get('/signup', function(req, res, next) {
  res.render('user/signup', {Title: "Sign Up"});
});

/* POST user sign up listing. */
router.post('/logup', userCon.signUp);



/* GET user sign in listing. */
router.get('/signin', function(req, res, next) {
  res.render('user/signin', {Title: "Sign In"});
});

/* POST user sign in listing. */
router.post('/login', userCon.signIn);



/* GET user sign out listing. */
router.get('/signout', function(req, res, next) {
  res.render('user/signout', {Title: "Sign Out"});
});



/* GET user forgot password listing. */
router.get('/forgot', function(req, res, next) {
  res.render('user/forgot', {Title: "Forgot Password"});
});

/* POST user forgot password listing. */
router.post('/resetpassword', userCon.resetpassword);


/* GET change forgot password listing. */
router.get('/updatePassword/:userID', function(req, res, next) {
  res.render('user/changePw', {Title: "Change Password"});
});

/* GET change forgot password listing. */
router.post('/updatePassword/:userID', userCon.changepassword);



module.exports = router;
