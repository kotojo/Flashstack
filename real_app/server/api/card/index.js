var express = require('express');
var router = express.Router();
//
var Card = require('./card.model');
router.route('/')
	.get(function(req, res){
		Card.find({}, function(err, datas){
			if (err){
				res.send(err);
			} else {
				console.log('Requested to show all cards');
				res.json(datas);
			}
		});
	});
module.exports = router;