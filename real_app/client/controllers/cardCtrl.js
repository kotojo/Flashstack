  //start module and inject the service
angular.module('cardCtrl', ['cardService'])

//card controller for main page and injecting factory
.controller('cardController', function(Card) {

  var vm = this;

  // vm.currentUserId = Auth.currentUserId;

  // $rootScope.$watch(function() {
  //   return Auth.currentUserId;
  // }, function(newValue) {
  //   vm.currentUserId = newValue;
  // });

  //processing variable to show loading things
  vm.processing = true;

  //grab all cards
  Card.all()
    .success(function(data) {

      //remove processing when we get cards
      vm.processing = false;

      //bind cards to vm when we get them
      vm.cards = data;
    });

  vm.deleteCard = function(id) {
    vm.processing = true;
    //pass in card id as param
    Card.delete(id)
      .success(function(data) {

        //get all cards and refresh list
        Card.all()
          .success(function(data) {
            vm.processing = false;
            vm.cards = data;
          });
      });
  };
})
.controller('cardShowController', function(Card, $routeParams) {

  var vm = this;

  Card.get($routeParams.card_id)
    .success(function(data) {
      vm.card = data;
  });

})
.controller('cardCreateController', function(Card) {

  var vm = this;

  //var to hide or show elements in view depending on create or edit page
  vm.type = 'create';

  //create a card
  vm.saveCard = function() {
    vm.processing = true;

    //clear message
    vm.message = '';

    //cardcard service create method

    //Card service create method

    Card.create(vm.cardData)
      .success(function(data) {
        vm.processing = false;
        //clear the form
        vm.cardData = {};
        vm.message = 'Card created successfully!';
      });
  };
})
.controller('cardEditController', function(Card, $routeParams) {

  var vm = this;

  vm.type = 'edit';

  //get the card data for the card we want to edit using routeparams
  Card.get($routeParams.card_id)
    .success(function(data) {
      vm.cardData = data;
  });

  //save card
  vm.saveCard = function() {
    vm.processing = true;
    vm.message = '';

  //call the update function
  Card.update($routeParams.card_id, vm.cardData)
    .success(function(data) {
      vm.processing = false;

      vm.cardData = {};

      vm.message = data.message;
    });
  };

});



