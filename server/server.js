// Load the modules:
var express = require('express');// Module that provides web app framework that provides simpler interface to create request endpoints, handle sessions,
var path = require('path'); // Module that provides helper function to handle path manipulation
var bodyParser = require('body-parser');// Module that help parse the body of the request as json
//
var multer = require('multer');
var done=false;
var app = express(); // Create a server/app  object
var middlewares = require('./api/middlewares');
//-----------------------------------------------------------------------------------
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//-----------------------------------------------------------------------------

// Main routes
app.use('/api', require('./api/routes'));

app.use(multer({ dest: 'client/assets/img/uploads',
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
app.use('/api', require('./api/routes'));
app.post('/authenticate', middlewares.generateToken);
app.get('/me', function(req, res){
	res.send(req.decoded);
});
// Hook to mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://clublyfe:ohnoes31@ds061621.mongolab.com:61621/flashcard_app');
// mongoose.connect('mongodb://localhost/flash_card_app');
// Populate datas:
var Models = require('./populate_data'); // Automatically find and get the module exported from index.js file from models folder.
Models.populateData();
var Deck = require('./api/deck/deck.model');

app.post('/api/photo', function(req, res) {
  if(done==true){
    console.log(req.files);

    Deck.findOneAndUpdate({"pic": Object.keys(req.files)[0]},
                          { "pic": req.files[Object.keys(req.files)[0]]["path"].substring(7) },
                          function(err, data){
                            if (err) console.log(err);
                            console.log(JSON.stringify(data));
                          });

    res.redirect("/users/" + Object.keys(req.files)[0]);
  }
});
//
app.use(express.static(__dirname + '/../client')); // Serve the '../client' folder directly to the server.
//whenever our client requests a file like a CSS file, image, or JS file, Node will serve that resource by looking in the client folder
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../client/index.html'));
}); // Whenever a request comes into our server (using the * wildcard method), we will send
//		the user the index.html file which will have all of our Angular/HTML/CSS code.
// Main routes
//
//

config = {
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            6969
};

var server = app.listen(config.port, config.ip, function () {
  console.log('Club life happening at http://%s', config.port);
}); // Starts the server
