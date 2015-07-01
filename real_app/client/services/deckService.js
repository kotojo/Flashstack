angular.module('deckService', [])

.factory('Deck', function($http) {

  // create a new object
  var deckFactory = {};

  // get a single deck
  deckFactory.get = function(id) {
    return $http.get('/api/decks/' + id);
  };

  // get all decks
  deckFactory.all = function() {
    return $http.get('/api/decks/');
  };

  // create a deck
  deckFactory.create = function(deckData) {
    return $http.post('/api/decks/', deckData);
  };

  // update a deck
  deckFactory.update = function(id, deckData) {
    return $http.put('/api/decks/' + id, deckData);
  };

  // delete a deck
  deckFactory.delete = function(id) {
    return $http.delete('/api/decks/' + id);
  };

  // return our entire deckFactory object
  return deckFactory;

});
