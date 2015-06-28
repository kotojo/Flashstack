// Load the modules:
var express = require('express');// Module that provides web app framework that provides simpler interface to create request endpoints, handle sessions, 
var path = require('path'); // Module that provides helper function to handle path manipulation
//
var app = express(); // Create a server/app  object
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------




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