// Load the modules:
var express = require('express');// Module that provides web app framework that provides simpler interface to create request endpoints, handle sessions, 
var path = require('path'); // Module that provides helper function to handle path manipulation
//
var app = express(); // Create a server/app  object
//-----------------------------------------------------------------------------------
var server = app.listen(6969, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Club life happening at http://%s:%s', host, port);
}); // Starts the server
//-----------------------------------------------------------------------------
// Serve the '../client' folder directly to the server.
app.use('/', express.static('../client'));
// app.use:  Mount the middleware function to the path. Default to '/'
// Note: if there is an index.html file, it will be bounded directly to '/' (the home path)
// 'partials folder': Where to keep the Front end (angularjs) single view.
//--------------------------------------------------------------------------------
// Create simple router
var apiRouter = express.Router();// Create an instance of router on api router
apiRouter.get('/', function(req, res){
	res.json({'message': "Welcome to api router"});
});
app.use('/api', apiRouter); // Mount middleware router to url
//----------------------------------------------------------------
// Hook to mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flash_card_app');
// Populate datas:
var Models = require('./models'); // Automatically find and get the module exported from index.js file from models folder.
Models.populateData();