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

});
