// Load the modules:
var express = require('express');// Web app framework that provides simpler interface to create request endpoints, handle sessions, 
var path = require('path'); // Has helper function to handle path manipulation
//
var app = express(); // Create a server object
// app.get('/', function(req, res) {
// 	res.send('YOLO BIATCHES');
// }); // Route for home page.
var server = app.listen(6969, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Club life happening at http://%s:%s', host, port);
}); // Starts the server
// Serve the '../client' folder directly to the server.
app.use('/', express.static('../client'));
// app.use:  Mount the middleware function to the path. Default to '/'
// Note: if there is an index.html file, it will be bounded directly to '/' (the home path)
// 'partials folder': Where to keep the Front end (angularjs) single view.

// Create simple router
var apiRouter = express.Router();// Create an instance of router on api router
apiRouter.get('/', function(req, res){
	res.json({'message': "Welcome to api router"});
});
app.use('/api', apiRouter); // Mount middleware router to url
// Hook to mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flash_card_app');
// Get the models:
var User = require('./models/user');
var Card = require('./models/card');
var Deck = require('./models/deck');
// Remove all existent users and populate new users.
User.remove({}, removeCallback)
.then(function(){
	var userOne = new User({ name: 'Simon', nickname: 'Duc', age: 20 });
	var userTwo = new User({ name: 'Sally', username: 'Sally the boss'});
	userOne.save();
	userTwo.save();
});
Card.remove({}, removeCallback)
.then(function(){
	Card.create({name: "Duc"});
});
Deck.remove({}, removeCallback)
.then(function(){
	Deck.create({name: "duc"});
});
function removeCallback(err, removal ) {
	if (err) {
		return handleError(err);
	} else {
		console.log(removal.result.n + ' documents removed');
	}
}

