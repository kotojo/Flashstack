angular.module('cardService', [])

.factory('Card', function($http) {

	// create a new object
	var cardFactory = {};

	// get a single cad
	cardFactory.get = function(id) {
		return $http.get('/api/cards/' + id);
	};

	// get all cards
	cardFactory.all = function() {
		return $http.get('/api/cards/');
	};

	// create a card
	cardFactory.create = function(cardData) {
		return $http.post('/api/cards/', cardData);
	};

	// update a card
	cardFactory.update = function(id, cardData) {
		return $http.put('/api/cards/' + id, cardData);
	};

	// delete a card
	cardFactory.delete = function(id) {
		return $http.delete('/api/cards/' + id);
	};

	// return our entire cardFactory object
	return cardFactory;

});


