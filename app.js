const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require("bcryptjs");

// Passport Config
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Models
const User = require("./models/user.js");




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projects');
var adminRouter = require('./routes/admin');


passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser((id, done) => {
  User.findOne({_id: id}).then( function(user) { 
    done(null, user._id)
  })
  .catch( function(err) {
    if (err) { return done(err); }
  }) 
})


passport.use(new LocalStrategy({
    usernameField: 'queryemail',
    passwordField: 'querypassword'
  },
  function(queryemail, querypassword, done) {
    console.log('made it');
    User.findOne({email: queryemail}).then( function(user) {
      // Check if Exists
      if(user){
        // Check password
        console.log("Found user: ", user);
        bcrypt.compare(querypassword, user.password).then(function(check) {
          if(!check) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          if(check) {
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
  })
);



var app = express();

mongoose.connect(`mongodb+srv://${process.env.MONOG_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@dev-rv8ag.mongodb.net/${process.env.MONGO_ATLAS_DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.COOKIE_SECRET));
const sessConfig = {
  cookie: {maxAge: 2628000000},
  store: new (require('express-sessions'))({
    storage: 'mongodb',
    instance: mongoose,
    db: process.env.MONGO_ATLAS_DB_NAME, // optional
    collection: 'sessions', // optional
    expire: 86400, // optional
  }),
  saveUninitialized: false,
  resave: true,
  secret: process.env.SESSION_SECRET,
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sessConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/project', projectRouter);
app.use('/', indexRouter);


/* GET user sign up listing. */
// app.get('/users/signup', pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/signup', {Title: "Sign Up"});
// });

// /* POST user sign up listing. */
// app.post('/users/logup', userCon.signUp);

// /* GET user sign in listing. */
// app.get('/users/signin', pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/signin', {Title: "Sign In", messages: req.message});
// });

// /* POST user sign in listing. */
// app.post('/users/login', function(req,res,next){

//     console.log('Body', req.body);
//     passport.authenticate("local", function(err, user, info){
//       if(err) {
//         console.log(err);
//       }
//       if(!user){
//         res.redirect('signin');
//       }
//       else {
//         req.logIn();
//         res.redirect('about');
//       }
//       console.log(info);
      
//    })(req,res,next); 
//  });

// /* GET user sign out listing. */
// app.get('/users/signout', function(req, res, next) {
//   req.logout();
//   req.session.destroy(function (err) {
//     res.clearCookie('connect.sid');
//     res.redirect('signin'); //Inside a callback… bulletproof!
//   });
// });

// /* GET user forgot password listing. */
// app.get('/users/forgot',pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/forgot', {Title: "Forgot Password"});
// });

// /* POST user forgot password listing. */
// app.post('/users/resetpassword',pass.checkNOTAuth, userCon.resetpassword);

// /* GET change forgot password listing. */
// app.get('/users/updatePassword/:userID',pass.checkNOTAuth, function(req, res, next) {
//   res.render('user/changePw', {Title: "Change Password"});
// });

// /* GET change forgot password listing. */
// app.post('/users/updatePassword/:userID',pass.checkNOTAuth, userCon.changepassword);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;