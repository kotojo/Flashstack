// Middleware modules
var exported = {};

exported.indexFunction = function(model) {
	return function(req, res){
		model.find({}, function(err, data){
			if (err) return res.send(500, err);
			return res.status(200).json(data);
		});
	};
};
exported.showFunction = function(model) {
	return function(req, res, next){
		model.findById( req.params.id, function(err, data){
			if (err) return res.send(500, err);
			if (!data) {
				return res.sendStatus(404)
			}; //Not found
			res.status(200).json(data);
		});
	};
};
exported.createFunction = function(model) {
	return function(req, res, next){
		model.create(req.body, function(err, data){
			if (err) return res.send(500, err);
			return res.status(201).json(data);
		});
	};
};

exported.destroyFunction = function(model) {
	return function(req, res, next){
		model.findById(req.params.id, function(err, data){
			if (err) return res.send(500, err);
			if (!data) return res.sendStatus(404);
			data.remove(function(err){
				if (err) return res.send(500, err);
				return res.sendStatus(204);
			});
		});
	};
};
exported.updateFunction = function(model){
	return function(req, res, next){
	};
};
exported.generateToken = function(req, res){
	var User = require('./user/user.model');
	var jwt = require('jsonwebtoken');
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
};
exported.validateToken = function(req, res, next){
	var jwt = require('jsonwebtoken');
	var secret = 'something';
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
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
};
module.exports = exported;