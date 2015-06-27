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
// Create user
var userSchema = new mongoose.Schema({
 name: String,
 age: Number,
 username: String
});
var User = mongoose.model('User', userSchema);
var userOne = new User({ name: 'Simon' });
var userTwo = new User({ name: 'Sally' });
userOne.save();
userTwo.save();
User.findOne({'name': 'Sally'}, function(err, user){
	console.log(user);
});
User.remove({'name': 'Sally'}
	, function(err, user){
	if (err){ 
		return handleError(err);
	} else {
		console.log('removed');
	}
}
);

