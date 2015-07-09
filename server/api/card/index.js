var express = require('express');
var router = express.Router();
//
var Card = require('./card.model');
var CardController = require('./card.controller');
router.get('/', CardController.index);
router.post('/', CardController.create);
router.get('/:id', CardController.show);
router.delete('/:id', CardController.destroy);
module.exports = router;




