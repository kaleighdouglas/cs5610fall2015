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

//var DecisionUserModel = require("./public/project/server/models/user.model.js");

//var db = mongoose.connect('mongodb://localhost/cs5610');
//console.log(mongoose);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(multer()); 
app.use(session({secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var ipaddress = process.env.OPENSHIFT_NODEJS_IP; // || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; 



require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose, passport, GoogleStrategy, googleCredentials, cookieParser, session);


app.listen(port, ipaddress);
