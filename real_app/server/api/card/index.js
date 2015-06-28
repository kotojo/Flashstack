var express = require('express');
var router = express.Router();
//
var Card = require('./card.model');
var CardController = require('./card.controller');
router.route('/')
	.get(CardController.index);
module.exports = router;