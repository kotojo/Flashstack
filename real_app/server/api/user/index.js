
// Get the router 
var express = require('express');
var router = express.Router();
// Get the model
var User = require('./user.model');
//
router.route('/')
	.get(function(req, res){
		User.find({}, function(err, datas){
			if (err) {
				res.send(err);
			} else {
				console.log('Requested to show all users');
				res.json(datas);
			}
		});
	});



module.exports = router;