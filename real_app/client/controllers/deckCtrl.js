  //start module and inject the service
angular.module('deckCtrl', ['deckService', 'cardService'])

//deck controller for main page and injecting factory
.controller('deckController', function(Deck) {

  var vm = this;

  // vm.currentUserId = Auth.currentUserId;

  // $rootScope.$watch(function() {
  //   return Auth.currentUserId;
  // }, function(newValue) {
  //   vm.currentUserId = newValue;
  // });

  //processing variable to show loading things
  vm.processing = true;

  //grab all decks
  Deck.all()
    .success(function(data) {

      //remove processing when we get decks
      vm.processing = false;

      //bind decks to vm when we get them
      vm.decks = data;
    });

  vm.deleteDeck = function(id) {
    vm.processing = true;
    //pass in deck id as param
    Deck.delete(id)
      .success(function(data) {

        //get all decks and refresh list
        Deck.all()
          .success(function(data) {
            vm.processing = false;
            vm.decks = data;
          });
      });
  };
})
.controller('deckShowController', function(Deck, Card, $routeParams) {

  var vm = this;

  Deck.get($routeParams.deck_id)
    .success(function(data) {
      vm.deck = data;
  }).then(function(){
    Card.all()
      .success(function(data) {
        vm.allCards = data;
    }).then(function(){
        vm.Cards = [];

        for(i = 0; i < vm.deck.cards.length; i++) {
          for(j = 0; j < vm.allCards.length; j++) {
            if(vm.allCards[j]._id == vm.deck.cards[i]) {
              vm.Cards.push(vm.allCards[j]);
            };
          };
        };
    });
  });

  vm.saveCard = function() {
    vm.cardMessage = '';

    Card.create(vm.cardData)
      .success(function(data) {
        vm.deck.cards.push(data._id);
        //do deck update herex

        Deck.update($routeParams.deck_id, vm.deck)
          .success(function(data) {
            vm.processing = false;

          });

        vm.cardData = {};
        vm.cardMessage = 'Card created successfully';
    }).then(function(){
      Deck.get($routeParams.deck_id)
        .success(function(data) {
        vm.deck = data;
        }).then(function(){
          Card.all()
            .success(function(data){
              vm.allCards = data;
            }).then(function(){
              vm.Cards = [];

              for(i = 0; i < vm.deck.cards.length; i++) {
                for(j = 0; j < vm.allCards.length; j++) {
                  if(vm.allCards[j]._id == vm.deck.cards[i]) {
                    vm.Cards.push(vm.allCards[j]);
                  };
                };
              };
            });
        });
      });
  };

})
.controller('deckCreateController', function(Deck) {

  var vm = this;

  //var to hide or show elements in view depending on create or edit page
  vm.type = 'create';

  //create a deck
  vm.saveDeck = function() {
    vm.processing = true;

    //clear message
    vm.message = '';

    console.log(vm.deckData);

    //Deck service create method

    Deck.create(vm.deckData)
      .success(function(data) {
        vm.processing = false;
        //clear the form
        vm.deckData = {};
        vm.message = 'Deck created successfully!';
      });
  };
})
.controller('deckEditController', function(Deck, $routeParams) {

  console.log("I'm here! deckEditController!")

  var vm = this;

  vm.type = 'edit';

  //get the deck data for the deck we want to edit using routeparams
  Deck.get($routeParams.deck_id)
    .success(function(data) {
      vm.deckData = data;
  });

  //save deck
  vm.saveDeck = function() {
    vm.processing = true;
    vm.message = '';


  //call the update function
  Deck.update($routeParams.deck_id, vm.deckData)
    .success(function(data) {
      vm.processing = false;

      vm.deckData = {};

      vm.message = data.message;
    });
  };

});



