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
module.exports = exported;