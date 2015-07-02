var express = require('express');

var router = express.Router();

var middlewares = require('./middlewares');

// router.use(middlewares.validateToken); // Check and validate token for every request with api

router.use('/users', require('./user')); // Mount middleware router to url
//----------------------------------------------------------------
router.use('/decks', require('./deck'));
//----------------------------------------------------------------
router.use('/cards', require('./card'));


router.post('/authenticate', middlewares.generateToken);
router.get('/me', function(req, res){
	res.send(req.decoded);
});
module.exports = router;
