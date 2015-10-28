// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var load           = require('express-load');
var jwt            = require('jsonwebtoken'); 
var mongoose       = require('mongoose');
var fs             = require('fs');
var router         = express.Router();

// configuration ===========================================

// config files
var db    = require('./config/db');
var token = require('./config/token');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
app.set('superSecret', token.secret)
app.set('router', router);
app.use(router);
mongoose.connect(db.url);


// get all data/stuff of the body (POST) parameters
// parse application/json
// default limit for bodyParser.json is 1mb
app.use(bodyParser.json({limit: '50mb'}));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
//require('./app/routes/nerd')(app); // configure our routes
load('./back/models')
	.then('./back/controllers')
	.then('./back/routes')
	.into(app);

   
function redirectUnmatched(req, res) {
  res.redirect("/");
}

app.use(redirectUnmatched); 

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;