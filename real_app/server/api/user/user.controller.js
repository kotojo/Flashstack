
var model = require('./user.model');// Get the models
var controller = {}; // Define an object to export
// Defines the middleware functions for the controller
controller.index = function(req, res){
	model.find({}, function(err, data){
		if (err) return res.send(500, err);
		console.log('adf');
		return res.status(200).json(data);
	});
}; // Requested to show all users
module.exports = controller;