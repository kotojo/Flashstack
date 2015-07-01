var express = require('express');

var router = express.Router();

var middlewares = require('./middlewares');


router.use('/users', require('./user')); // Mount middleware router to url
//----------------------------------------------------------------
router.use('/decks', require('./deck'));
//----------------------------------------------------------------
router.use('/cards', require('./card'));



router.use(middlewares.validateToken); // Check and validate token for every request with api

module.exports = router;
