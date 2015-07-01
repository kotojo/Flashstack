var express = require('express');

var router = express.Router();
var middlewares = require('./middlewares');
//
router.use(middlewares.validateToken);
router.use('/users', require('./user')); // Mount middleware router to url
//----------------------------------------------------------------
router.use('/decks', require('./deck'));
//----------------------------------------------------------------
router.use('/cards', require('./card'));
	//

module.exports = router;
