var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var googleCredentials = require("./google.js");

var connectionString = 'mongodb://127.0.0.1:27017/cs5610'; //-oharakaleigh

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var DecisionUserModel = require("./public/project/server/models/user.model.js");

//var db = mongoose.connect('mongodb://localhost/cs5610');
//console.log(mongoose);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
//app.use(session({secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var ipaddress = process.env.OPENSHIFT_NODEJS_IP; // || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; 



require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose, passport, GoogleStrategy, googleCredentials);


/*
passport.serializeUser(function (user, done){
    console.log("serializeUser");
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function (obj, done){
    DecisionUserModel  //
        .findById(obj._id)
        .then(function(user){
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: googleCredentials.clientId,
    clientSecret: googleCredentials.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        process.nextTick(function() {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            DecisionUserModel   //
                .CreateGoogleUser(profile)
                .then(function(user){
                    return done(null, user);
                });
        });
    }
));

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get("/auth/google",
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/contacts.readonly']}),
    function(req, res){	
});

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/#/login' }),
    function(req, res) {
        res.redirect('/');
});
    
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
	
app.get('loggedin', function(req, res){
    if (req.isAuthenticated()){
        DecisionUserModel  //
            .findById(req.user._id)
            .then(function(user){
                res.json(user);
            });
    } else {
        res.send('0');
    }
});  */




app.listen(port, ipaddress);
