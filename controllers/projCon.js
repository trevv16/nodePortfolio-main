
var mongoose = require("mongoose");

var Project = require("../models/project.js");

var User = require("../models/user.js");



// Get All Projects
exports.getAll = function(req, res, next) { 
    var foundprojects;
   
    if(req.query.viewtype) {
      viewtype = req.query.viewtype;
    }
    else {
      viewtype = "card";
    }
    
    Project.find()
    
    .then(function(doc) {
        
        if (doc) {
            foundprojects = doc;
            res.render('projects', {Title: "Projects", Project: foundprojects, View: viewtype});   
        }
        
     
    
    })
    .catch( function(err) {
        if(err){
            console.log('DB Error: ' + err);
        }
    });
    
}


// Sign Up Function
exports.getProjectByID = function(req, res, next) { 
    
    var projectData;
    var skills;
    var query = req.params._id;
    var sliderimgs;
    var dateString;
    var projDate;
    var day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var scrip;
    
  
    Project.find({ _id: query})
    
    .then( function(result) {
        
        if(result.length > 0){
            projectData = result[0];
            skills = projectData.skills_used;
            sliderimgs = projectData.img_gallery;
            
            dateString = new Date(projectData.pub_date);
            
            if(dateString.getUTCDate() === 1) { 
                scrip = "st";
                
            } else if (dateString.getUTCDate() === 2) {
                scrip = "nd";
                
            } else if (dateString.getUTCDate() === 3) {
                scrip = "rd";
                
            } else {
                scrip = "th";
                
            }
            
            projDate = `${day[dateString.getUTCDay()]} ${mon[dateString.getUTCMonth()]} ${dateString.getUTCDate()}<sup>${scrip}</sup>, ${dateString.getFullYear()}`;
            
            
            res.render('project', {Title: "Projects", Proj: projectData, Skills: skills, Slider: sliderimgs, Pub: projDate});
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



// Sign Up Function
exports.getProjectsBySkill = function(req, res, next) { 
    
    var skillquery = req.query.skill;
    var viewtype = req.query.viewtype;
    
    // Find Projects that contain "skill" in "skills_used"
    Project.find({
        'skills_used.skill': skillquery
    })
    
    .then( function(result) {
      
      if(result){
          
          res.render('projects', {Title: "Projects", Project: result, View: viewtype});
      }
      else {
        
        res.redirect('home');
        console.log("Project Not Found.")
        
      }
        
    })
    .catch( function(err) {
        if(err){
            console.log('DB Error:' + err);
        }
    });
    
}

