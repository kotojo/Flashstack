// Load the modules:
var express = require('express');// Module that provides web app framework that provides simpler interface to create request endpoints, handle sessions,
var path = require('path'); // Module that provides helper function to handle path manipulation
var bodyParser = require('body-parser');// Module that help parse the body of the request as json
//
var multer = require('multer');
var done=false;
var app = express(); // Create a server/app  object
//-----------------------------------------------------------------------------------
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//-----------------------------------------------------------------------------

// Main routes
app.use('/api', require('./api/routes'));

app.use(multer({ dest: './client/assets/img/uploads',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

// app.use:  Mount the middleware function to the path. Default to '/'
// Note: if there is an index.html file, it will be bounded directly to '/' (the home path)
//--------------------------------------------------------------------------------

// Test routing user



// app.use('/cards', cardRouter);
// Hook to mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flash_card_app');
// Populate datas:
var Models = require('./populate_data'); // Automatically find and get the module exported from index.js file from models folder.
Models.populateData();
var Deck = require('./api/deck/deck.model');

app.post('/api/photo', function(req, res) {
  if(done==true){
    console.log(req.files);

    Deck.findOneAndUpdate({"userId": Object.keys(req.files)[0]},
                          { "pic": req.files[Object.keys(req.files)[0]]["path"] },
                          function(err, data){
                            if (err) console.log(err);
                            console.log(JSON.stringify(data));
                          });

    res.end("File uploaded.");
  }
});
//
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
