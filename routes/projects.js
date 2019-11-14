var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var Project = require("../models/project.js");

var projCon = require("../controllers/projCon.js");



var name;
var date;
var link;
var img;
var desc;
var demo;
var code;



/* GET calculator page. */
router.get('/calculator', function(req, res, next) {
  res.render('projects/webcalculator', { Title: 'Web Calculator' });
});


/* GET clock page. */
router.get('/clock', function(req, res, next) {
  res.render('projects/webclock', {Title: "Web Clock"});
});

/* GET weather page. */
router.get('/weather', function(req, res, next) {
  res.render('projects/weather', {Title: "Weather App"});
});



/* GET projects by skill page. */
router.get('/skill', projCon.getProjectsBySkill);


/* GET barcode page. */
router.get('/quiz', function(req, res, next) {
  
  
  res.render('projects/quiz', {Title: "Quiz App"});
});




/* GET project page. */
router.get('/:_id', projCon.getProjectByID);



module.exports = router;