
// Get the router 
var express = require('express');
var router = express.Router();
// Get the model

var Deck = require('./deck.model');
//
router.route('/')
	.get(function(req, res){
		Deck.find({}, function(err, datas){
			if (err) {
				res.send(err);
			} else {
				console.log('Requested to show all decks');
				res.json(datas);
			}
		});
	});

module.exports = router;


