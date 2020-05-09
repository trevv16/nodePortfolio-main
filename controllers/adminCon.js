var mongoose = require("mongoose");

// MODELS
var User = require("../models/user.js");
var Project = require("../models/project.js");
var Blog = require("../models/blog.js");
var Post = require("../models/post.js");

// CONTROLLERS
// var projCon = require("./projCon.js");

// GET Dash Function
exports.getDash = function(req, res, next) {
  var me = this;
  var viewtype = (req.query.viewtype) ? viewtype = req.query.viewtype : viewtype = "card";
  var foundprojects = me.getProjects;
  console.log('found: ', foundprojects);
  // Count: foundprojects.length,
  res.render('admin/dash', {Title: "Dashboard", Work: foundprojects, View: viewtype});
}

//////////////// ADMIN PROJECT FUNCTIONS ///////////////////////////////////////

// GET New Project Function
exports.getProjects = function() {
  var projects;
  Project.find()
  .then((doc) => {
      if (doc) {
          projects = doc;
      }
  })
  .catch((err) => {
      if(err){
          console.log('DB Error: ',err);
      }
  });

  return projects;
}

// GET New Project Function
exports.newProject = function(req, res, next) {
    res.render('projects/new', { Title: 'New Project' });
}

// POST Add Project Function
exports.addProject = function(req, res, next) {
  var name = req.body.name;
  var date = req.body.date;
  var link = req.body.link;
  var img = req.body.img;
  var imgFile;
  var desc = req.body.desc;
  var demo = req.body.demo;
  var code = req.body.code;
  var gallery_imgs = [];
  var skills = req.body.skills;

  function getSkill(skillname) {
      var skName;

      switch (skillname.toLowerCase()) {
          case 'html':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/html.png";
              gallery_imgs.push(skName);
          break;

          case 'css':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/css.png";
              gallery_imgs.push(skName);
          break;

          case 'javascript':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/js.png";
              gallery_imgs.push(skName);
          break;

          case 'java':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/java.png";
              gallery_imgs.push(skName);
          break;

          case 'jquery':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/jqueryIcon.png";
              gallery_imgs.push(skName);
          break;

          case 'node js':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/node.png";
              gallery_imgs.push(skName);
          break;

          case 'bootstrap':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/bootstrap.png";
              gallery_imgs.push(skName);
          break;

          case 'mongodb':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/mongodb.png";
              gallery_imgs.push(skName);
          break;

          case 'sql':
              skName = "https://elasticbeanstalk-us-east-2-257945705175.s3.us-east-2.amazonaws.com/portfolioimages/sql.png";
              gallery_imgs.push(skName);
          break;

          default:
              // code
          break;
      }
  }

  for (var i = 0; i < skills.length; i++ ) {
    getSkill(skills[i]);
  }


  // Check for image upload
  if(req.file) {
    imgFile = req.file;

    console.log("Image File ",imgFile);
  }
  else throw 'error';

  /********************
   *
   *
   *
   *
   *
   *
   * HANDLE S3 STORAGE, RETRIEVE LINK
   *
   *
   *
   *
   *
   *
   * **********************/

  // Create new Project
  var genProject = new Project({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    pub_date: date,
    proj_link: link,
    proj_img: img,
    proj_desc: desc,
    skills_used: gallery_imgs,
    demo_link: demo,
    code_link: code
  });

  genProject.save()
  .then( function(result) {
    if(result){
      console.log('DB Result:' + result);
    }
  })
  .catch( function(err) {
    if(err){
      console.log('DB Error:' + err);
    }
  });

  console.log('Saved New Project');
  res.redirect('/projects');
}


// GET Edit Project Function
exports.editProject = function(req, res, next) {
    Project.find({ _id: req.params._id})
    .then( function(result) {
        if(result){
          projectData = result[0];
          skills = result[0].skills_used;
          res.render('projects/edit', {Project: projectData, Skills: skills, Id: query});
        }
        else {
          res.redirect('projects');
          console.log("Project Not Found.")
        }
    })
    .catch( function(err) {
        if(err){
            console.log('DB Error:' + err);
        }
    });
}

// POST Update Project Function
exports.updateProject = function(req, res, next) {

     var query = req.params._id;

    var proj = req.body;

    Project.findOneAndUpdate({_id: mongoose.Types.ObjectId(query)}, { $set: {proj}}, {"new": true}, function(err, doc) {

      if (err) {
        console.log("Error", err);
      }

      // Updates All Potential Fields
      (req.body.name) ? doc.name = req.body.name : null;
      (req.body.pub_date) ? doc.pub_date = req.body.pub_date : null;
      (req.body.proj_img) ? doc.proj_img = req.body.proj_img : null;
      (req.body.proj_desc) ? doc.proj_desc = req.body.proj_desc : null;
      (req.body.proj_link) ? doc.proj_link = req.body.proj_link : null;
      (req.body.demo_link) ? doc.demo_link = req.body.demo_link : null;
      (req.body.code_link) ? doc.code_link = req.body.code_link : null;

      doc.save( function(err,result) {
        console.log(result);
      })

    })
    .catch( function(err) {
      if(err){
          console.log('DB Error:' + err);
      }
    });

    res.redirect('/projects/'+ query);
}

//////////////// ADMIN BLOG FUNCTIONS ///////////////////////////////////////

// GET Blogs Function
exports.getBlogs = function(req, res, next) {
}

// GET Blog's posts Function
exports.getBlogPosts = function(req, res, next) {
}


// GET Post Function
exports.getPost = function(req, res, next) {
}


//////// BLOG FUNCTIONS ///////////

// GET New Blog Function
exports.newBlog = function(req, res, next) {
}

// POST Add Blog Function
exports.addBlog = function(req, res, next) {
}


// GET Edit Blog Function
exports.editBlog = function(req, res, next) {
}

// POST Update Blog Function
exports.updateBlog = function(req, res, next) {
}


//////// POST FUNCTIONS ///////////

// GET New Post Function
exports.newPost = function(req, res, next) {
}

// POST Add Post Function
exports.addPost = function(req, res, next) {
}


// GET Edit Post Function
exports.editPost = function(req, res, next) {
}

// POST Update Post Function
exports.updatePost = function(req, res, next) {
}