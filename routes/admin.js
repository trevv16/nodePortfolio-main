var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var multer = require('multer');
var upload = multer({dest: __dirname + '/uploads/images'});

var checkAuth = require("../middleware/check-auth.js");

var User = require("../models/user.js");

var adminCon = require("../controllers/adminCon.js");


/* GET admin dashboard listing. */
router.get('/', adminCon.getDash);

  


//////////////// ADMIN PROJECT FUNCTIONS /////////////////////////////////////// 


/* GET admin dashboard listing. */
router.get('/newProject', adminCon.newProject);

/* GET admin dashboard listing. */
router.post('/addProject', upload.single('photo'), adminCon.addProject);


/* GET admin dashboard listing. */
router.get('/editProject/:_id', checkAuth, adminCon.editProject);

/* GET admin dashboard listing. */
router.post('/updateProject/:_id', adminCon.updateProject);


//////////////// ADMIN BLOG FUNCTIONS /////////////////////////////////////// 

/* GET blogs listing. */
router.get('/blog', adminCon.getBlogs);


/* GET posts of blog listing. */
router.get('/blog/:blogName', adminCon.getBlogPosts);

/* GET post listing. */
router.get('/blog/:postID', adminCon.getPost);


/* GET new post listing. */
router.get('/blog/newPost', adminCon.newPost);

/* GET new post listing. */
router.post('/blog/addPost', adminCon.addPost);

/* GET new post listing. */
router.get('/blog/editPost', adminCon.editPost);

/* GET new post listing. */
router.get('/blog/updatePost', adminCon.updatePost);

module.exports = router;
