var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    pub_date: { type: Date, default: Date.now },
    proj_link: String,
    proj_img: String,
    img_gallery: [],
    proj_desc: String,
    skills_used: [{
        skill: String,
        skill_img: String
    }],
    demo_link: String,
    code_link: String,
    generated: { type: Date, default: Date.now }
});

    
    

module.exports = mongoose.model('Project', projectSchema, 'projects');