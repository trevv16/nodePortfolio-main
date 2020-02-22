var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var checkAuth = require("../middleware/check-auth.js");

const multer = require('multer');
const upload = multer({
  dest: __dirname + '/uploads/images'
});


// Internal Files

var Project = require("../models/project.js");

var Subscriber = require("../models/subscriber.js");

var projCon = require("../controllers/projCon.js");

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('index', { Title: "Test Page"});
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {Title: "Home"});
});


/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { Title: 'About' });
});


/* GET resume page. */
router.get('/resume', function(req, res, next) {
  console.log("Made it");
  res.sendFile('public/Trevor Njeru, Resume 2019.pdf');
});


/* GET work page. */
router.get('/work', function(req, res, next) {
  res.render('work', {Title: "Work"});
});


/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {Title: 'Contact'});
});


/* POST email list. */
router.post('/subscribe/email-list', function(req, res, next) {

  var firstname = req.body.fName;
  var lastname = req.body.lName;
  var email = req.body.Email;
  var list = "main";

  var sub = {

    "first_name": firstname,
    "last_name": lastname,
    "email": email
  };

// Query email
Subscriber.findOneAndUpdate( {email: email}, {$set: {sub}}, {"new": true}, function(err,doc) {

    if (err) {

      console.log("Did Not Find User", err);
    }


    // If subscriber exists, Do update instead
    if (doc){

      console.log("Found Existing Subscriber");

      if (req.body.fName) {

        doc.first_name = firstname;
      }

      if (req.body.lName) {

        doc.last_name = lastname;
      }

      if (req.body.Email) {

        doc.email = email;
      }

      doc.save(function(err, result) {

        if (err) {

          console.log("Update Error: ", err);
        } else {

          console.log(result);
        }


      });

      console.log("Updated Existing Subscriber");


      res.redirect('/projects');


    } else {

      // If no subscriber, create new subscriber
      var genSubscriber = new Subscriber({

        _id: new mongoose.Types.ObjectId(),
        first_name: firstname,
        last_name: lastname,
        email: email,
        lists: ["main", "projects"]

      });

      console.log(genSubscriber);

      genSubscriber.save()
      .then(function(result) {

        if (result) {
          console.log('DB Result:' + result);
        }
      })
      .catch(function(err) {
        if (err) {
          console.log('DB Error:' + err);
        }
      });

      console.log('Saved New Subscriber');
      res.redirect('/projects');
    }

  })

  .catch(function(err) {

    if (err) {
      console.log('DB Error:' + err);
    }

  });

});



//////////////////////////////////////////////////////////////////////////////




module.exports = router;
