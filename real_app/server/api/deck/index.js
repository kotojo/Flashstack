
// Get the router 
var express = require('express');
var router = express.Router();
// Get the model

var Deck = require('./deck.model');
var DeckController = require('./deck.controller');
//
router.route('/')
	.get(DeckController.index);

module.exports = router;


