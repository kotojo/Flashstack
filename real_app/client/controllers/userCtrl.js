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

  vm.deleteUser = function(id) {
    vm.processing = true;
    //pass in user id as param
    User.delete(id)
      .success(function(data) {

        //get all users and refresh list
        User.all()
          .success(function(data) {
            vm.processing = false;
            vm.users = data;
          });
      });
  };
})
.controller('userShowController', function(User, $routeParams) {

  var vm = this;

  User.get($routeParams.user_id)
    .success(function(data) {
      vm.user = data;
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

    //User service create method
    User.create(vm.userData)
      .success(function(data) {
        vm.processing = false;
        //clear the form
        vm.userData = {};
        vm.message = 'User created successfully!';
      });
  };
})
.controller('userEditController', function(User, $routeParams) {

  var vm = this;

  vm.type = 'edit';

  //get the user data for the user we want to edit using routeparams
  User.get($routeParams.user_id)
    .success(function(data) {
      vm.userData = data;
  });

  //save user
  vm.saveUser = function() {
    vm.processing = true;
    vm.message = '';

  //call the update function
  User.update($routeParams.user_id, vm.userData)
    .success(function(data) {
      vm.processing = false;

      vm.userData = {};

      vm.message = data.message;
    });
  };

});



