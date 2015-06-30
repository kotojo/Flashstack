//start module and inject the service
angular.module('userCtrl', ['userService'])

//user controller for main page and injecting factory
.controller('userController', function(User) {

  var vm = this;

  //processing variable to show loading things
  vm.processing = true;

  //grab all users
  User.all()
    .success(function(data) {

      //remove processing when we get users
      vm.processing = false;

      //bind users to vm when we get them
      vm.users = data;
    });

})
.controller('userCreateController', function(User) {

  var vm = this;

  //var to hide or show elements in view depending on create or edit page
  vm.type = 'create';

  //create a user
  vm.saveUser = function() {
    vm.processing = true;

    //clear message
    vm.message = '';

    //use User service create method
    User.create(vm.userData)
      .success(function(data) {
        vm.processing = false;

        //clear the form
        vm.userData = {};
        vm.message = data.message;
      });
  };
});
