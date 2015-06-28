var model = require('./card.model'); // Get the models
var controller = {}; // Define an object to export
controller.index = function(req, res){
	model.find({}, function(err, data){
		if (err) return res.send(500, err);
		console.log('Requested to show all cards');
		return res.status(200).json(data);
	});
}; // Requested to show all users

module.exports = controller;