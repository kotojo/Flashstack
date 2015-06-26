// Load the modules:
var express = require('express');// Web app framework that provides simpler interface to create request endpoints, handle sessions, 
var path = require('path'); // Has helper function to handle path manipulation
//
var app = express(); // Create a server object
app.get('/', function(req, res) {
	res.send('YOLO BIATCHES');
});
var server = app.listen(6969, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Club life happening at http://%s:%s', host, port);
}); // Starts the server
