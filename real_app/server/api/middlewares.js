
var exported = {};

function getIndexFunction (model) {
	return function(req, res){
		model.find({}, function(err, data){
			if (err) return res.send(500, err);
			console.log('Requested to show all value of models');
			return res.status(200).json(data);
		});
	};
}
exported.indexFunction = getIndexFunction;
module.exports = exported;