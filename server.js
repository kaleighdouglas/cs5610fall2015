var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data
var mongoose = require('mongoose');


var connectionString = 'mongodb://127.0.0.1:27017/cs5610'; //-oharakaleigh

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);


//var db = mongoose.connect('mongodb://localhost/cs5610');
//console.log(mongoose);


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


var ipaddress = process.env.OPENSHIFT_NODEJS_IP; // || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; 



require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
