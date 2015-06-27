// This is the main file for models.
var Card = require('./api/card/card.model');
var Deck = require('./api/deck/deck.model');
var User = require('./api/user/user.model');

// -------------------------------------------------------------------------
// Populate some sample datas
var userSamples = [ 
			{name: 'Bruce', age: 25, username:'kotojo'},
			{name: 'Chri', age: 30, username:'chriskemeza'}, 
			{name: 'Du Anh tran', age: 21, username:'trananhduc'},
			{name: 'Tikvah', age: 25, username: 'tikvah'}
			];
var deckSamples = [{name: 'Deck 1'}, {name: 'Deck 2'}];
var cardSamples = [{name: 'Card 1'}, {name: 'Card 2'}, {name: 'Card 3'}];
// --------------------------------------------------------------------------
var dataArray = [{'Model': User, 'samples': userSamples}, 
				{'Model': Deck, 'samples': deckSamples}, 
				{'Model': Card, 'samples': cardSamples}];
// Remove all existent datas from all models, then populate new datas from new models
function populateData(){
	dataArray.forEach(function(value, index, array){
		var Model = value['Model'];
		var samples = value['samples'];
		Model.remove({}, callbackForModelRemove)
		.then(function(){
			samples.forEach(function(value, index, array){
				Model.create(value);
			});
		});
	});
};
function callbackForModelRemove(err, removal ) {
	if (err) {
		return handleError(err);
	} else {
		console.log(removal.result.n + ' documents removed');
	}
};
// Export the populateData functions
var exported = {};
exported.populateData = populateData;
module.exports = exported;
