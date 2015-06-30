var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();




router.use('/users', require('./user')); // Mount middleware router to url
//----------------------------------------------------------------
router.use('/decks', require('./deck'));
//----------------------------------------------------------------
router.use('/cards', require('./card'));


var authenticateMiddleware = function(req, res){
	var User = require('./user/user.model');
	var secret = 'something';
	User.findOne({username: req.body.username})
		.select('name username password').exec(function(err, user){
		if (err) throw err;
		if (!user) {
			res.json({
				success: false,
				message: "User not found"
			});
		} else if (user) {
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({
					success: false,
					message: "Wrong password"
				});
			} else {
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, secret, {
					expiresInMinutes: 2
				});
				res.json({
					success: true,
					message: "Huray",
					token: token
				});
			}
		}
	});
}
router.post('/authenticate', authenticateMiddleware);
router.use(function(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if (token){
		jwt.verify(token, secret, function(err, decoded){
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		});
	}
});
router.get('/me', function(req, res){
	res.send(req.decoded);
});


module.exports = router;