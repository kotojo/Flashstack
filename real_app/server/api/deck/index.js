
// Get the router 
var express = require('express');
var router = express.Router();
var middlewares = require('./../middlewares');
// Get the model

var Deck = require('./deck.model');
var DeckController = require('./deck.controller');
//
router.get('/', DeckController.index);
router.post('/',  DeckController.create);
router.get('/:id', DeckController.show);
router.delete('/:id', DeckController.destroy)
module.exports = router;


