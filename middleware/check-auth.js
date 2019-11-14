var jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    
    try {
        var token = req.headers.authorization.split(" ")[1];
        console.log("Verified Token: ", token);
        var decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch (error) {
        console.log('Error: ', error)
        
    }
    
    
} 