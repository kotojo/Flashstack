// Load the modules:
var express = require('express');// Module that provides web app framework that provides simpler interface to create request endpoints, handle sessions, 
var path = require('path'); // Module that provides helper function to handle path manipulation
var bodyParser = require('body-parser');// Module that help parse the body of the request as json
var jwt = require('jsonwebtoken');
//
var app = express(); // Create a server/app  object
//-----------------------------------------------------------------------------------
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//-----------------------------------------------------------------------------

var secret = 'something';
var apiRouter = express.Router();

var authenticateMiddleware = function(req, res){
	var User = require('./api/user/user.model');
	User.findOne({username: req.body.username
	}).select('name username password').exec(function(err, user){
		if (err) throw err;
		if (!user) {
			res.json({
				success: false,
				message: "User not found"
			});
		} else if (user) {
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({
					success: false,
					message: "Wrong password"
				});
			} else {
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, secret, {
					expiresInMinutes: 2
				});
				res.json({
					success: true,
					message: "Huray",
					token: token
				});
			}
		}
	});
}
apiRouter.post('/authenticate', authenticateMiddleware);
apiRouter.use(function(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if (token){
		jwt.verify(token, secret, function(err, decoded){
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		});
	}
});
apiRouter.get('/me', function(req, res){
	res.send(req.decoded);
});
app.use('/api', apiRouter);


var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQnJ1Y2UiLCJ1c2VybmFtZSI6ImtvdG9qbyIsImlhdCI6MTQzNTU5MDUxNywiZXhwIjoxNDM1NTkwNjM3fQ.KaiNHw33hDp1NcsJDsKA1iiCOCxi0ulgvoI4TRdaZZM";
















// app.use:  Mount the middleware function to the path. Default to '/'
// Note: if there is an index.html file, it will be bounded directly to '/' (the home path)
//--------------------------------------------------------------------------------

// Test routing user



var userRouter = require('./api/user');
app.use('/users', userRouter); // Mount middleware router to url
//----------------------------------------------------------------
var deckRouter = require('./api/deck');
app.use('/decks', deckRouter);
//----------------------------------------------------------------
var cardRouter = require('./api/card');
app.use('/cards', cardRouter);
// Hook to mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flash_card_app');
// Populate datas:
var Models = require('./populate_data'); // Automatically find and get the module exported from index.js file from models folder.
Models.populateData();
app.use(express.static(__dirname + '/../client')); // Serve the '../client' folder directly to the server. 
//whenever our client requests a file like a CSS file, image, or JS file, Node will serve that resource by looking in the client folder
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../client/index.html'));
}); // Whenever a request comes into our server (using the * wildcard method), we will send
//		the user the index.html file which will have all of our Angular/HTML/CSS code.
var server = app.listen(6969, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Club life happening at http://%s:%s', host, port);
}); // Starts the server